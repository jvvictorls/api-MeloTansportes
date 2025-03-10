import { Request, Response } from 'express';
import mapStatusHTTP from '../Utils/mapStatusHttp';
import AuthService from '../Services/authService';

class AuthController {
  constructor(
    private authService = new AuthService(),

  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.authService.login({ email, password });
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    const { accessToken, refreshToken } = data;
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });
    return res.status(200).json(accessToken);
  }

  async refreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.authService.findByToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    return res.cookie(
      'accessToken',
      data,
      { httpOnly: true },
    ).json({ message: 'Access token refreshed' });
  }
}

export default AuthController;
