import { IRoutes } from './IRoutes';

export default interface IRoutesModel {
  getRouteById(id: number): Promise<IRoutes | null>;
  getAllRoutes(): Promise<IRoutes[]>
}
