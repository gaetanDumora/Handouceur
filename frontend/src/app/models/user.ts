export interface User {
  id: number;
  name?: string;
  email: string;
  accessToken: string;
  admin: boolean;
  createdAt: string;
}
export interface Credentials {
  email: string;
  password: string;
  name?: string;
}
