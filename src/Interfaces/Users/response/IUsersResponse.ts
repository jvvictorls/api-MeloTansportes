import IUsers from '../IUsers';

export type IUsersResponse = Omit<IUsers, 'password'>;