export default interface IUsers {
  id: number,
  name: string,
  email: string,
  password: string,
  type: 'admin' | 'user' | 'driver' | 'superadmin'
}
