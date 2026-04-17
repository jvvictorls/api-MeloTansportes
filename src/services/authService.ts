import bcrypt from 'bcrypt';
import IRefreshToken from '../Interfaces/refreshToken/IRefreshToken';
import RefreshTokenModel from '../models/refreshToken.model';
import JWT from '../utils/jwt';
import { ServiceResponse } from '../utils/serviceResponse';
import ILogin from '../Interfaces/Users/ILogin';
import UsersModel from '../models/users.model';
import crypto from 'crypto';
import IUsersFromDb from '../Interfaces/Users/IUsersFromDb';
import { password } from '../database/config/database';

class RefreshTokenService {
  private refreshTokenModel = new RefreshTokenModel();
  private jwt = JWT;
  private usersModel = new UsersModel();

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private generateTokens(user: { name: string; type: string; id: number }): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwt.sign(
      {id: user.id, name: user.name, type: user.type},
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

  async delete(id: number): Promise<ServiceResponse<null>> {
  const deleted = await this.refreshTokenModel.delete(id);

  if (!deleted) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Token not found' },
    };
  }

  return { status: 'SUCCESSFUL', data: null };
}

  async login(user: ILogin): Promise<ServiceResponse<{ accessToken: string;
    refreshToken: string
  }>> {
    const userExists = await this.usersModel.findByEmail(user.email);

    if (!userExists) return { status: 'INVALID_DATA', data: { message: 'User dont exists' } };
    if (!bcrypt.compare(user.password, userExists.password)) {
      return { status: 'INVALID_DATA',
        data: { message: 'incorrect password' },
      };
    }
    const tokens = this.generateTokens({ name: userExists.name, type: userExists.type, id: userExists.id });

    const hash = this.hashToken(tokens.refreshToken);
    
    await this.refreshTokenModel.create({ userId: userExists.id,
      token: hash,
      createdAt: new Date(),
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { status: 'SUCCESSFUL', data:  tokens };
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

      const tokens = this.generateTokens({ name: user.name, type: user.type, id: user.id });
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

  async getUserFromToken(token: string): Promise<ServiceResponse<IUsersFromDb>> {
    if (!token) {
      return { status: 'INVALID_DATA', data: { message: 'missing token' } };
    }

    try {
      const decoded = this.jwt.verify(token) as { id: number };

      const user = await this.usersModel.findById(decoded.id);
      
      if(!user) {
        return { status: 'NOT_FOUND', data: { message: 'User not found' } };
      }

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
      };

      return { status: 'SUCCESSFUL', data: userWithoutPassword  };
    } catch (e: any) {
      return { status: 'UNAUTHORIZED', data: { message: e.message } };
    }
  }
}

export default RefreshTokenService;
