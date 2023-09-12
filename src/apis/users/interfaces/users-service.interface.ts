// users-service.interface.ts

import { CreateUserInput } from '../dto/create-users.input';

export interface IUsersServiceCreate {
    createUserInput: CreateUserInput;
}

export interface IUsersServiceFindOneByEmail {
    email: string;
}

export interface IUsersServiceUpdate {
    updateUserInput: UpdateUserInput;
}

export interface IUsersServiceDelete {
    email: string;
    password: string;
}
