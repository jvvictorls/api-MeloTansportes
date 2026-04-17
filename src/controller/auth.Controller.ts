import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHttp';
import AuthService from '../services/authService';

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  sameSite:isProduction ?'none' as const : 'lax' as const,
  secure: isProduction,
};

class AuthController {
  constructor(
    private authService = new AuthService(),

  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.authService.login({ email, password });
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    const { accessToken, refreshToken } = data;
    res.cookie('refreshToken', refreshToken, cookieOptions);
    return res.status(200).json({ accessToken });
  }

  async refreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.refreshToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) {
      res.clearCookie('refreshToken');
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const {accessToken, refreshToken: newRefreshToken} = data;
    res.cookie('refreshToken', newRefreshToken, cookieOptions);
    return res.status(200).json({ accessToken });
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token not provided' });
    }

    const { status, data } = await this.authService.logout(refreshToken);

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.clearCookie('refreshToken');

    return res.status(200).json(data);
  }

  async getUserByToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.getUserFromToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }
}

export default AuthController;
