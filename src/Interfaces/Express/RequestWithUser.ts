import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user?: string | JwtPayload
}

export default RequestWithUser;
