export interface User {
  id: number;
  name?: string;
  email: string;
  accessToken: string;
  admin: boolean;
  createdAt: string;
}

export interface Token {
  key: string;
  value?: string;
}

export type DecodedJWTToken = User & { iat: number }; // issued at
