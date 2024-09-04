export default interface IExtraRoutes {
  id: number,
  date: Date,
  costCenter: string,
  userId: number,
  driver: string,
  client: string,
  createdAt: Date,
  updatedAt: Date,
  collaborators: {
      id: number,
      name: string,
    }[],
  user: {
    id: number,
    name: string
  }
}