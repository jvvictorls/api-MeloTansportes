export default interface IUsersFromDb {
  id: number,
  name: string,
  email: string,
  password: string,
  type: 'admin' | 'user' | 'driver' | 'superadmin' | 'supervisor' | 'coordinator' | 'manager',
}