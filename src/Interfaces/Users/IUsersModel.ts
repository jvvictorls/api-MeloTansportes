import IUsers from './IUsers';

export default interface IUsersModel {
  findById(id: number): Promise<IUsers | null>;
  findByEmail(email: string): Promise<IUsers | null>;
  create(user: IUsers): Promise<IUsers>;
  update(id: number, user: IUsers): Promise<IUsers | null>;
  delete(id: number): Promise<number>;
  findAll(): Promise<IUsers[] | null>;
}
