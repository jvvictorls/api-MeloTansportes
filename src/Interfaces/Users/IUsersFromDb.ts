export default interface IUsersFromDb {
  id: number,
  name: string,
  email: string,
  type: 'admin' | 'user' | 'driver' | 'superadmin' | 'supervisor' | 'coordinator' | 'manager',
}