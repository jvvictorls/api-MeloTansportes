import { Request } from 'express';

export interface IUserJwtPayload {
  id: number;
  name: string;
  type: string;
}

interface RequestWithUser extends Request {
  user?: IUserJwtPayload;
}

export default RequestWithUser;
