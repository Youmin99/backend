// users-service.interface.ts

export interface IUsersServiceCreate {
    email: string;
    password: string;
    name: string;
    phone: number;
  }
  
  export interface IUsersServiceFindOneByEmail {
    email: string;
  }