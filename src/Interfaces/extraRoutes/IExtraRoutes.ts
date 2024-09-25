export default interface IExtraRoutes {
  id: number,
  origin: string,
  destination: string,
  date: Date,
  costCenter: string,
  userId: number,
  driver: string,
  client: string,
  status: string,
  createdAt: Date,
  updatedAt: Date,
  time: string,
  collaborators: {
      id: number,
      name: string,
    }[],
  user: {
    id: number,
    name: string
  }
}