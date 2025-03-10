import { Request, Response } from 'express';
import RefreshTokenService from '../Services/refreshToken.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

class AuthController {
  constructor(
    private refreshTokenService = new RefreshTokenService(),
  ) {}

  async refreshAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { status, data } = await this.refreshTokenService.findByToken(refreshToken);
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    return res.cookie(
      'accessToken',
      data,
      { httpOnly: true },
    ).json({ message: 'Access token refreshed' });
  }
}

export default AuthController;
