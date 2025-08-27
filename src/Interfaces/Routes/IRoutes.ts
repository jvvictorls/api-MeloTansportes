import { ICollaboratorsUpdate } from '../collaborators/ICollaborators';

export interface IRoutes {
  id: number,
  name: string,
  driver: string,
  client: string,
  maxCollaborators: number,
  shift: string,
  period: string,
  createdAt: Date,
  updatedAt: Date
}

export interface RoutesFromDb {
  id: number,
  name: string,
  driver: string,
  client: string,
  maxCollaborators: number,
  shift: string,
  period: string,
  createdAt: Date,
  updatedAt: Date,
  collaborators?: ICollaboratorsUpdate[]
}
