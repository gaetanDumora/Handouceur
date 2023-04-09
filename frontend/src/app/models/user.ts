export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  admin: boolean;
  avatar: string;
  createdAt: string;
}

export interface RegisterInputs extends Credentials {
  firstName: string;
  lastName: string;
  address?: string;
  avatar?: string;
}
export interface Credentials {
  email: string;
  password: string;
}
