import { Request, Response } from 'express';
import UsersService from '../Services/Users.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

export default class UsersController {
  constructor(
    private usersService: UsersService = new UsersService(),
  ) {}

  async findAll(req: Request, res: Response) {
    const { status, data } = await this.usersService.findAll();
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.usersService.findById(Number(id));
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { status, data } = await this.usersService.findByEmail(email);
      if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
      return res.status(200).json(data);
    } catch (e: any) {
      return e.message;
    }
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    const { status, data } = await this.usersService.create(user);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(201).json(data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const { status, data } = await this.usersService.update(Number(id), user);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.usersService.delete(Number(id));
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    return res.status(200).json(data);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.login({ email, password });
    if (status !== 'SUCCESSFUL' || !data) return res.status(mapStatusHTTP(status)).json(data);
    const { accessToken, refreshToken } = data;
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });
    return res.status(200).json(accessToken);
  }
}
