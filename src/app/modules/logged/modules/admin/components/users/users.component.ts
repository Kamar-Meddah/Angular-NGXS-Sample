import {Component, OnDestroy} from '@angular/core';
import {UserService} from '../../../../../../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../../../../model/user';
import {NgxCoolDialogsService} from 'ngx-cool-dialogs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {

  public currentPage: string;
  public routeSubscription: Subscription;
  public users: any;
  public displayedColumns = ['username', 'email', 'confirmed', 'role', 'createdAt', 'action'];
  public pageLength: number;
  public pageSize: number;
  public query: string;


  constructor(private userService: UserService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private coolDialogs: NgxCoolDialogsService) {
    this.currentPage = '1';
    let query: string | null;
    this.routeSubscription = this.route.queryParams.subscribe((res) => {
      if (res.page === undefined || res.page <= 0) {
        this.currentPage = '1';
      } else {
        this.currentPage = res.page;
      }
      if (res.query !== undefined) {
        query = res.query;
      }
      this.userService.getAllUsersP(this.currentPage, query)
        .then((users: any) => {
          this.pageSize = users.totalPages;
          this.pageLength = users.numberOfElements;
          this.users = users;
        })
        .catch((err: HttpErrorResponse) => {
          this.toastr.warning(`You are probably offline !`);
        });
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  public save(user: User): void {
    if (user.role === null) {
      user.role = 'user';
    }
    this.userService.updateRoleAndConfirm(user.role, user.id)
      .then((res: any) => {
        this.toastr.success('Successfully updated');
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.toastr.error(`An error occurred`);
        } else {
          this.toastr.warning('You are Currently offline');
        }
      });
  }

  public change($event): void {
    this.currentPage = $event.pageIndex + 1;
    this.router.navigate(['/administration/users'], {
      queryParams: {page: this.currentPage},
      queryParamsHandling: 'merge'
    });

  }

  public remove(element: User): void {
    this.coolDialogs.confirm(`Do you want to delete ${element.username}?`)
      .subscribe(sub => {
        if (sub) {
          this.userService.deleteUser(element.id)
            .then((res: any) => {
              this.toastr.success(`${element.username} was deleted`);
              // this.users.content = this.users.content.filter((elm) => elm.id !== element.id);
              this.router.navigate(['/administration/users'], {
                queryParams: {page: this.currentPage},
                queryParamsHandling: 'merge'
              });
            })
            .catch((err: HttpErrorResponse) => {
              if (err.status === 400) {
                this.toastr.error('An Error occurred');
              } else {
                this.toastr.warning('You are probably offline');
              }
            });
        }
      });
  }

  public search(): void {
    this.currentPage = '1';
    if (this.query !== '') {
    this.router.navigate(['/administration/users'], {
      queryParams: {page: this.currentPage, query: this.query}
    });
    } else {
      this.router.navigate(['/administration/users'], {
        queryParams: {page: this.currentPage}
      });
    }
  }

}
