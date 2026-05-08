import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';
import {IUserJwtPayload} from '../Interfaces/Express/RequestWithUser';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';

  static sign(payload: JwtPayload, expiresIn: string): string {
    return sign(payload, this.secret, { expiresIn, algorithm: 'HS256' });
  }

  static verify(token: string): IUserJwtPayload {
    return verify(token, this.secret) as IUserJwtPayload;
  }
}
