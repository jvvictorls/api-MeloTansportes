export default interface ICollaborators {
  id: number
  name: string
  neighborhood: string,
  city: string,
  street: string,
  number: string,
  phone: string
  arrivalRouteId: number
  outboundRouteId: number
  company: string
  department: string,
  position: string,
  createdAt: Date
  updatedAt: Date
}
