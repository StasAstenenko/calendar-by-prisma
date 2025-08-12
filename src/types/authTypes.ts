export type CreateUserResult = SignInResponse | Error;

export interface SignInResponse {
  error: string | null;
  status: number;
  ok: boolean;
  url: string | null;
}
