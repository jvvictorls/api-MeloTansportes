import suppliesModel from "../models/supplies.model";
import { ServiceResponse } from "../utils/serviceResponse";
import ISupplies from "../Interfaces/Supplies/ISupplies";
export default class suppliesService {
  private suppliesModel = new suppliesModel();

  async getAll(): Promise<ServiceResponse<ISupplies[]>> {
    const supplies = await this.suppliesModel.getAll()
    if(!supplies.length) {
      return { status: 'NOT_FOUND', data: { message: 'No supplies found' } };
    }
    return { status: 'SUCCESSFUL', data: supplies };
  }
  }