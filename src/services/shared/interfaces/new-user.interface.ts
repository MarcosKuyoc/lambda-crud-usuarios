export interface RequestNewUser {
  name: string;
  lastName?: string;
  age: number;
}

export interface ResponseNewUser extends RequestNewUser {
  pk: string;
}