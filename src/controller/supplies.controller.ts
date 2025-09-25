import mapStatusHTTP from "../utils/mapStatusHttp";
import { Request, Response } from "express";
import suppliesService from "../services/supplies.service";

export default class suppliesController {
  private suppliesService = new suppliesService();
  
  async getAll(req: Request, res: Response) {
    const { status, data } = await this.suppliesService.getAll();
    if(status === 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }
    return res.status(200).json(data);
}
}