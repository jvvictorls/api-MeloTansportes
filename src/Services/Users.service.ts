import UsersModel from '../Models/Users.model';
import { ServiceResponse } from '../Utils/serviceResponse';
import IUsers from '../Interfaces/Users/IUsers';
import IUsersModel from '../Interfaces/Users/IUsersModel';
import ILogin from '../Interfaces/Users/ILogin';
import JWT from '../Utils/JWT';
import RefreshTokenModel from '../Models/refreshToken.model';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
    private jwt = JWT,
    private refreshTokenModel = new RefreshTokenModel(),
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

  async create(user: IUsers): Promise<ServiceResponse<IUsers>> {
    const userExists = await this.usersModel.findByEmail(user.email);
    if (userExists) {
      return {
        status: 'CONFLICT',
        data: { message: 'User already exists' },
      };
    }
    const createUser = await this.usersModel.create(user);
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

  // eslint-disable-next-line max-lines-per-function
  async login(user: ILogin): Promise<ServiceResponse<{
    accessToken: string;
    refreshToken: string
  }>> {
    const userExists = await this.usersModel.findByEmail(user.email);
    if (!userExists) return { status: 'INVALID_DATA', data: { message: 'User dont exists' } };
    if (userExists.password !== user.password) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'incorrect password' },
      };
    }
    const { email, type, id } = userExists;
    const accessToken = this.jwt.sign({ email, type, id }, '30000');
    const refreshToken = this.jwt.sign({ id: userExists.id }, '7d');
    await this.refreshTokenModel.create({
      userId: userExists.id,
      token: refreshToken,
      createdAt: new Date(),
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { status: 'SUCCESSFUL', data: { accessToken, refreshToken } };
  }
}
