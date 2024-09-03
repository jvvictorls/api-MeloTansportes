export default interface IExtraRoutes {
  id: Number,
  date: Date,
  costCenter: String,
  userId: Number,
  driver: String,
  client: String,
  createdAt: Date,
  updatedAt: Date,
  collaborators: {
      id: Number,
      name: String,
    }[],
  user: {
    id: Number | null,
    name: String | null
  }
}