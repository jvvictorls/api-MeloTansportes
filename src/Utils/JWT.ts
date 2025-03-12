import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';

  static sign(payload: JwtPayload, expiresIn: string): string {
    const { exp, ...cleanPayload } = payload; // Remove 'exp' se já existir
    return sign(cleanPayload, this.secret, { expiresIn, algorithm: 'HS256' });
  }

  static verify(token: string): JwtPayload | string {
    return verify(token, this.secret) as JwtPayload;
  }
}
