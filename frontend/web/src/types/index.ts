export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export type TokenPair = {
  user: User;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type AccessPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type ApiErrorBody = {
  error: { code: string; message: string; details: Record<string, unknown> };
  request_id: string;
};
