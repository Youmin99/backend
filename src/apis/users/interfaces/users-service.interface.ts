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

  export interface IUsersServiceUpdate {
    email: string;
   // updateUserInput: UpdateUserInput;
}

  export interface IUsersServiceDelete{
    email: string;
    password: string;
  }