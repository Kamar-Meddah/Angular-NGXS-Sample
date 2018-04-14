export default interface JWT {
  sub: string;
  aud: string | null;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
}
