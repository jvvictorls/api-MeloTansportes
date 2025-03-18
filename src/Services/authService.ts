import IRefreshToken from '../Interfaces/refreshToken/IRefreshToken';
import RefreshTokenModel from '../Models/refreshToken.model';
import JWT from '../Utils/JWT';
import { ServiceResponse } from '../Utils/serviceResponse';
import ILogin from '../Interfaces/Users/ILogin';
import UsersModel from '../Models/Users.model';

class RefreshTokenService {
  private refreshTokenModel = new RefreshTokenModel();
  private jwt = JWT;
  private usersModel = new UsersModel();

  async create(
    refreshToken: IRefreshToken,
  ): Promise<ServiceResponse<IRefreshToken>> {
    if (!refreshToken) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'missing refresh token' },
      };
    }
    const newRefreshToken = await this.refreshTokenModel.create(refreshToken);
    if (!newRefreshToken) {
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: 'Error creaeting refreshToken, please try again' },
      };
    }
    return { status: 'CREATED', data: newRefreshToken };
  }

  async findById(id: number): Promise<ServiceResponse<IRefreshToken>> {
    if (!id) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'An id must be provided' },
      };
    }
    const findRefreshToken = await this.refreshTokenModel.findByID(id);
    if (!findRefreshToken) {
      return { status: 'NOT_FOUND', data: { message: 'token not found' } };
    }
    return { status: 'SUCCESSFUL', data: findRefreshToken };
  }

  async findByToken(token: string): Promise<ServiceResponse<IRefreshToken>> {
    if (!token) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'missing refresh_token' },
      };
    }
    const findRefreshToken = await this.refreshTokenModel.findByToken(token);
    if (!findRefreshToken) {
      return { status: 'NOT_FOUND', data: { message: 'invalid Token' } };
    }
    return { status: 'SUCCESSFUL', data: findRefreshToken };
  }

  async update(id: number): Promise<ServiceResponse<IRefreshToken>> {
    if (!id) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'An id must be provided' },
      };
    }
    const findRefreshToken = await this.refreshTokenModel.findByID(id);
    if (!findRefreshToken) {
      return { status: 'NOT_FOUND', data: { message: 'token not found' } };
    }
    const updatedRefreshToken = await this.findById(id);
    return updatedRefreshToken;
  }

  async delete(id: number): Promise<ServiceResponse<IRefreshToken | null>> {
    const deleteRefreshToken = await this.refreshTokenModel.delete(id);
    if (deleteRefreshToken) {
      return {
        status: 'INTERNAL_SERVER_ERROR',
        data: { message: 'Failed to delete refreshToken' },
      };
    }
    return { status: 'SUCCESSFUL' };
  }

  async login(user: ILogin): Promise<ServiceResponse<{ accessToken: string;
    refreshToken: string
  }>> {
    const userExists = await this.usersModel.findByEmail(user.email);
    if (!userExists) return { status: 'INVALID_DATA', data: { message: 'User dont exists' } };
    if (userExists.password !== user.password) {
      return { status: 'INVALID_DATA',
        data: { message: 'incorrect password' },
      };
    }
    const { email, type, id } = userExists;
    const accessToken = this.jwt.sign({ email, type, id }, '15m');
    const refreshToken = this.jwt.sign({ id: userExists.id }, '7d');
    await this.refreshTokenModel.create({ userId: userExists.id,
      token: refreshToken,
      createdAt: new Date(),
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { status: 'SUCCESSFUL', data: { accessToken, refreshToken } };
  }

  async refreshToken(refreshToken: string): Promise<ServiceResponse<string>> {
    if (!refreshToken) {
      return { status: 'INVALID_DATA', data: { message: 'missing refresh-token' },
      };
    }
    const findRefreshToken = await this.refreshTokenModel.findByToken(refreshToken);
    if (!findRefreshToken) {
      return { status: 'NOT_FOUND', data: { message: 'invalid token' } };
    }
    try {
      const decoded = this.jwt.verify(refreshToken) as { userId: number, exp: number };
      if (Date.now() > decoded.exp * 1000) {
        return { status: 'UNAUTHORIZED', data: { message: 'Token expired' } };
      }
      const newAccessToken = this.jwt.sign({ userId: decoded.userId }, '15m');
      return { status: 'SUCCESSFUL', data: newAccessToken };
    } catch (e: any) {
      return { status: 'UNAUTHORIZED', data: { message: e.message } };
    }
  }

  async logout(refreshToken: string): Promise<ServiceResponse<string>> {
    if (!refreshToken) {
      return { status: 'INVALID_DATA', data: { message: 'missing refresh-token' },
      };
    }
    const findRefreshToken = await this.refreshTokenModel.findByToken(refreshToken);
    if (!findRefreshToken) {
      return { status: 'NOT_FOUND', data: { message: 'invalid token' } };
    }
    const deleteRefreshToken = await this.refreshTokenModel.delete(findRefreshToken.id);
    if (deleteRefreshToken) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Failed to delete refreshToken' },
      };
    }
    return { status: 'SUCCESSFUL', data: 'Logout successful' };
  }
}

export default RefreshTokenService;
