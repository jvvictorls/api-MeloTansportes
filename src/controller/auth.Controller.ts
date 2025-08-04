import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHttp';
import AuthService from '../services/authService';

class AuthController {
  constructor(
    private authService = new AuthService(),

  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.authService.login({ email, password });
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    const { accessToken, refreshToken } = data;
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', secure: true });
    return res.status(200).json({ accessToken });
  }

  async refreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.refreshToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.logout(refreshToken);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    res.clearCookie('refreshToken');
    return res.status(200).json(data);
  }

  async getUserByToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.findByToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data.userId);
  }
}

export default AuthController;
