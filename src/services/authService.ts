import bcrypt from 'bcrypt';
import IRefreshToken from '../Interfaces/refreshToken/IRefreshToken';
import RefreshTokenModel from '../models/refreshToken.model';
import JWT from '../utils/jwt';
import { ServiceResponse } from '../utils/serviceResponse';
import ILogin from '../Interfaces/Users/ILogin';
import UsersModel from '../models/users.model';
import crypto from 'crypto';

class RefreshTokenService {
  private refreshTokenModel = new RefreshTokenModel();
  private jwt = JWT;
  private usersModel = new UsersModel();

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private generateTokens(user: { email: string; type: string; id: number }): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwt.sign(
      {id: user.id, email: user.email, type: user.type},
      '15m',
    );
    const refreshToken = this.jwt.sign({ id: user.id }, '7d');
    return { accessToken, refreshToken };
  }   
  
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
    if (!bcrypt.compareSync(user.password, userExists.password)) {
      return { status: 'INVALID_DATA',
        data: { message: 'incorrect password' },
      };
    }
    const { email, type, id } = userExists;
    const accessToken = this.jwt.sign({ email, type, id }, '15m');
    const refreshToken = this.jwt.sign({ id }, '7d');
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await this.refreshTokenModel.create({ userId: userExists.id,
      token: hash,
      createdAt: new Date(),
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { status: 'SUCCESSFUL', data: { accessToken, refreshToken } };
  }

  async refreshToken(oldRefreshToken: string): Promise<ServiceResponse<{accessToken: string; refreshToken: string}>> {
    if (!oldRefreshToken) {
      return { status: 'INVALID_DATA', data: { message: 'missing refresh-token' },
      };
    }

    const hash = this.hashToken(oldRefreshToken);
    const stored = await this.refreshTokenModel.findByToken(hash);

    if (!stored) {
      return { status: 'UNAUTHORIZED', data: { message: 'invalid token' } };
    }

    if(new Date() > stored.expiresIn) {
      await this.refreshTokenModel.delete(stored.id);
      return { status: 'UNAUTHORIZED', data: { message: 'token expired' } };
    }

    try {
      const decoded = this.jwt.verify(oldRefreshToken) as { id: number};
      const user = await this.usersModel.findById(decoded.id); 
      if (!user) {
        return { status: 'UNAUTHORIZED', data: { message: 'User not found' } };
      }

      await this.refreshTokenModel.delete(stored.id);

      const tokens = this.generateTokens({ email: user.email, type: user.type, id: user.id });
      const newHash = this.hashToken(tokens.refreshToken);

      await this.refreshTokenModel.create({ userId: user.id,
      token: newHash,
      createdAt: new Date(),
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });  
      return { status: 'SUCCESSFUL', data: tokens };  

    } catch (e: any) {
      return { status: 'UNAUTHORIZED', data: { message: e.message } };
    }
  }

  async logout(refreshToken: string): Promise<ServiceResponse<string>> {
    if (!refreshToken) {
      return { status: 'INVALID_DATA', data: { message: 'missing refresh-token' },
      };
    }

    const hash = this.hashToken(refreshToken);
    const stored = await this.refreshTokenModel.findByToken(hash);
    if (!stored) {
      return { status: 'UNAUTHORIZED', data: { message: 'invalid token' } };
    }
    
    const deleted = await this.refreshTokenModel.delete(stored.id);
    
    if(!deleted) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Failed to delete refresh token' } };
    }

    return { status: 'SUCCESSFUL', data: 'Logout successful' };
  }

  async getUserFromToken(token: string): Promise<ServiceResponse<{ userId: number }>> {
    if (!token) {
      return { status: 'INVALID_DATA', data: { message: 'missing token' } };
    }

    try {
      const decoded = this.jwt.verify(token) as { id: number };

      return { status: 'SUCCESSFUL', data: { userId: decoded.id } };
    } catch (e: any) {
      return { status: 'UNAUTHORIZED', data: { message: e.message } };
    }
  }
}

export default RefreshTokenService;
