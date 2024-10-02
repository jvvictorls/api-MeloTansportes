import { IRoutes } from "./IRoutes";

export default interface IRoutesModel {
  findOneRoute(id: number): Promise<IRoutes | null>;
  getAllRoutes(): Promise<IRoutes[]>
}
