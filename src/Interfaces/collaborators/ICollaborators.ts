export default interface ICollaborators {
  id: number
  name: string
  address: string
  phone: string
  routeId: number
  firm: 'Eurochem' | 'Cibra'
  department: 'ADM' | 'PRODUÇÃO' | 'HSE' | 'MANUTENÇÃO' |
  'QUALIDADE' | 'PCP' | 'RH' | 'LOGÍSTICA' | 'CORPORATIVO',
  type: 'SUPERVISOR' | 'COORDENADOR' | 'COLABORADOR' | 'GERENTE' |
  'DIRETOR' | 'ESTAGIÁRIO' | 'APRENDIZ' | 'TERCEIRIZADO' | 'OUTRO'
  createdAt: Date
  updatedAt: Date
}
