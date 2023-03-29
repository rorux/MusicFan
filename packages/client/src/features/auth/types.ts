export type User = {
  id: number;
  name: string;
  login: string;
  isActive: boolean;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserAndTokens = {
  user: User;
} & Tokens;

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
};

export type CreateUser = {
  name: string;
  login: string;
  password: string;
};

export type FindUser = Omit<CreateUser, 'name'>;
