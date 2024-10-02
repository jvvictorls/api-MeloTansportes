export interface IRoutes {
  id: number,
  name: string,
  driver: string,
  client: string,
  maxCollaborators: number,
  currentCollaborators: number,
  createdAt: Date,
  updatedAt: Date
}
