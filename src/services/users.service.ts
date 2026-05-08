import bcrypt from 'bcrypt';
import UsersModel from '../models/users.model';
import { ServiceResponse } from '../utils/serviceResponse';
import IUsers from '../Interfaces/Users/IUsers';
import IUsersModel from '../Interfaces/Users/IUsersModel';
import {IUsersResponse} from '../Interfaces/Users/response/IUsersResponse';


export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) {}

  // 🔹 helper interno (NUNCA retornar senha)
  private sanitizeUser(user: IUsers): IUsersResponse {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  // 🔹 reutilização central
  async findById(id: number): Promise<ServiceResponse<IUsers>> {
    const user = await this.usersModel.findById(id);

    if (user === null) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: user,
    };
  }

  async findAll(): Promise<ServiceResponse<IUsersResponse[]>> {
    const users = await this.usersModel.findAll();

    if (!users) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'No users found' },
    };
  }

    return {
      status: 'SUCCESSFUL',
      data: users.map((u) => this.sanitizeUser(u)),
    };
  }

  async findByEmail(email: string): Promise<ServiceResponse<IUsers>> {
    const user = await this.usersModel.findByEmail(email);

    if (!user) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: user,
    };
  }

  // 🔐 CREATE
  async create(user: IUsers): Promise<ServiceResponse<IUsersResponse>> {
    if (!user.email || !user.password) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'Email and password are required' },
      };
    }

    const existing = await this.usersModel.findByEmail(user.email);

    if (existing) {
      return {
        status: 'CONFLICT',
        data: { message: 'User already exists' },
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.usersModel.create({
      ...user,
      password: hashedPassword,
    });

    return {
      status: 'CREATED',
      data: this.sanitizeUser(createdUser),
    };
  }

  async update(id: number, user: IUsers): Promise<ServiceResponse<IUsersResponse>> {
    const { status } = await this.findById(id);

    if (status !== 'SUCCESSFUL') {
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
      data: this.sanitizeUser(updatedUser),
    };
  }

  // ❌ DELETE
  async delete(id: number): Promise<ServiceResponse<{ deleted: boolean }>> {
    const { status } = await this.findById(id);

    if (status !== 'SUCCESSFUL') {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }

    const deleted = await this.usersModel.delete(id);

    if (deleted < 1) {
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

  // 🔥 ENDPOINT /me (ESSENCIAL)
  async getMe(userId: number): Promise<ServiceResponse<IUsersResponse>> {
    const { status, data } = await this.findById(userId);

    if(!userId) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Usuário não autenticado' },
      };
    }

    if (status !== 'SUCCESSFUL') {
      return {
        status: 'NOT_FOUND',
        data: { message: 'User not found' },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: this.sanitizeUser(data),
    };
  }
}