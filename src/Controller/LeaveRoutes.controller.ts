import { Request, Response } from 'express';
import LeaveRoutesService from '../Services/LeaveRoutes.service';
import mapStatusHTTP from '../Utils/mapStatusHttp';

export default class OutboundController {
  private leaveRoutesService = new LeaveRoutesService();

  async getLeaveRoutes(req: Request, res: Response) {
    const { status, data } = await this.leaveRoutesService.getLeaveRoutes();
    if (status === 'SUCCESSFUL') {
      return res.status(200).json(data);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getLeaveRouteById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.leaveRoutesService.getLeaveRouteById(Number(id));
    if (status === 'SUCCESSFUL') {
      return res.status(200).json(data);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async createLeaveRoute(req: Request, res: Response) {
    try {
      const { body } = req;
      const { status, data } = await this.leaveRoutesService.createLeaveRoute(body);
      if (status === 'SUCCESSFUL') {
        return res.status(201).json(data);
      }
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateLeaveRoute(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const { status, data } = await this.leaveRoutesService.updateLeaveRoute(Number(id), body);
      if (status === 'SUCCESSFUL') {
        return res.status(200).json(data);
      }
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteLeaveRoutes(req: Request, res:Response) {
    const { id } = req.params;
    const { status, data } = await this.leaveRoutesService.deleteLeaveRoutes(Number(id));
    if (status === 'SUCCESSFUL') {
      return res.status(200).json(data);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
