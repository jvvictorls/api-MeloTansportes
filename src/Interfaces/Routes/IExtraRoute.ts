export default interface IExtraRoute {
  id: number
  costCenter: 'ADM' | 'PROD' | 'RH' | 'LOG' | 'MANUT' | 'QUAL' | 'PCP' | 'HSE',
  createdAt: Date
  updatedAt: Date
}