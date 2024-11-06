import LeaveRoutesModel from '../Models/LeaveRoutes.model';
import { ServiceResponse } from '../Utils/serviceResponse';
import ILeaveRoutes from '../Interfaces/leaveRoutes/ILeaveRoutes';
import INewLeaveRoutes from '../Interfaces/leaveRoutes/INewLeaveRoutes';

export default class LeaveRoutesService {
  private leaveRoutesModel = new LeaveRoutesModel();

  async getLeaveRoutes(): Promise<ServiceResponse<ILeaveRoutes[]>> {
    const leaveRoutes = await this.leaveRoutesModel.getLeaveRoutes();
    return { status: 'SUCCESSFUL', data: leaveRoutes };
  }

  async getLeaveRouteById(id: number): Promise<ServiceResponse<ILeaveRoutes>> {
    if (!id) {
      return { status: 'BAD_REQUEST', data: { message: 'Id is required' } };
    }
    const leaveRoute = await this.leaveRoutesModel.getLeaveRouteById(id);
    if (!leaveRoute) {
      return { status: 'NOT_FOUND', data: { message: 'Leave route not found' } };
    }
    return { status: 'SUCCESSFUL', data: leaveRoute };
  }

  async createLeaveRoute(body: INewLeaveRoutes): Promise<ServiceResponse<ILeaveRoutes>> {
    if (!body) {
      return { status: 'BAD_REQUEST', data: { message: 'Body is required' } };
    }
    const leaveRoute = await this.leaveRoutesModel.createLeaveRoute(body);
    return { status: 'SUCCESSFUL', data: leaveRoute };
  }

  async updateLeaveRoute(id: number, body: ILeaveRoutes): Promise<ServiceResponse<ILeaveRoutes>> {
    if (!body) {
      return { status: 'BAD_REQUEST', data: { message: 'Body is required' } };
    }
    const findRoute = await this.leaveRoutesModel.getLeaveRouteById(id);
    if (findRoute === body) {
      return { status: 'BAD_REQUEST', data: { message: 'No changes were made' } };
    }
    const leaveRoute = await this.leaveRoutesModel.updateLeaveRoute(id, body);
    if (!leaveRoute) {
      return { status: 'NOT_FOUND', data: { message: 'Leave route not found' } };
    }
    const updatedLeaveRoute = await this.leaveRoutesModel.getLeaveRouteById(id);
    if (!updatedLeaveRoute) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Error updating leave route' } };
    }
    return { status: 'SUCCESSFUL', data: updatedLeaveRoute };
  }

  async deleteLeaveRoutes(id: number): Promise<ServiceResponse<ILeaveRoutes>> {
    if (!id) {
      return { status: 'BAD_REQUEST', data: { message: 'Id is required' } };
    }
    await this.leaveRoutesModel.getLeaveRouteById(id);
    await this.leaveRoutesModel.deleteLeaveRoute(id);
    const leaveRoute = await this.leaveRoutesModel.getLeaveRouteById(id);
    if (leaveRoute) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Error deleting leave route' } };
    }
    return { status: 'SUCCESSFUL' };
  }
}
