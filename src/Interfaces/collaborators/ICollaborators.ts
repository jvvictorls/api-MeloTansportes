export interface ICollaborators {
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

export interface ICollaboratorsUpdate {
  id: number,
  name: string,
  phone: string,
  neighborhood: string,
  department: string,
  boardingTime: string

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
