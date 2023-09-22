export interface RequestNewUser {
  name: string;
  lastName: string;
}

export interface ResponseNewUser extends RequestNewUser {
  pk: string;
}