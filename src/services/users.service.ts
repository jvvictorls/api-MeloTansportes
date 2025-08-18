import bcrypt from 'bcrypt';
import UsersModel from '../models/users.model';
import { ServiceResponse } from '../utils/serviceResponse';
import IUsers from '../Interfaces/Users/IUsers';
import IUsersModel from '../Interfaces/Users/IUsersModel';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) { }

  async findAll(): Promise<ServiceResponse<IUsers[]>> {
    const users = await this.usersModel.findAll();
    if (!users) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'No users found' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: users,
    };
  }

  async findById(id: number): Promise<ServiceResponse<IUsers>> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'no user found' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: user,
    };
  }

  async findByEmail(email: string): Promise<ServiceResponse<IUsers>> {
    const user = await this.usersModel.findByEmail(email);
    if (!user) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'no user found' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: user,
    };
  }

  // eslint-disable-next-line max-lines-per-function
  async create(user: IUsers): Promise<ServiceResponse<IUsers>> {
    if (!user.email || !user.password) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'Email and password are required' },
      };
    }
    const { status } = await this.findByEmail(user.email);
    if (status === 'SUCCESSFUL') {
      return {
        status: 'CONFLICT',
        data: { message: 'User already exists' },
      };
    }
    const hashedPassword = bcrypt.hashSync((user.password), 10);
    const userWithHashedPassword: IUsers = { ...user, password: hashedPassword };
    const createUser = await this.usersModel.create(userWithHashedPassword);
    return {
      status: 'CREATED',
      data: createUser,
    };
  }

  async update(id: number, user: IUsers): Promise<ServiceResponse<IUsers>> {
    const userExists = await this.usersModel.findById(id);
    if (!userExists) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }
    const updatedUser = await this.usersModel.update(id, user);
    if (!updatedUser) {
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: 'Error updating user' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: updatedUser,
    };
  }

  async delete(id: number): Promise<ServiceResponse<{ deleted: boolean }>> {
    const userExists = await this.usersModel.findById(id);
    if (!userExists) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }
    const deleteUser = await this.usersModel.delete(id);
    if (deleteUser < 1) {
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: 'Error deleting user' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: { deleted: true },
    };
  }
}
