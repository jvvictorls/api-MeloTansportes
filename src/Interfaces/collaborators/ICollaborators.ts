export default interface ICollaborators {
  id: number
  admissionDate: Date
  name: string
  shift?: string
  phone?: string,
  zipCode: string,
  city: string,
  neighborhood: string,
  street: string,
  number: string,
  company: string
  department?: string,
  position?: string,
  createdAt: Date
  updatedAt: Date
}

export interface ICollaboratorsCreate {
  admissionDate: Date
  name: string
  shift?: string
  phone?: string,
  zipCode: string,
  city: string,
  neighborhood: string,
  street: string,
  number: string,
  company: string
  department?: string,
  position?: string
  createdAt: Date
  updatedAt: Date
}
