import { IRoutes } from "./IRoutes";

export default interface IRoutesModel {
  findOneRoute(id: number): Promise<IRoutes | null>;
  addOneCollaborator(id: number, collaborators: string): Promise<IRoutes | null>;
}
