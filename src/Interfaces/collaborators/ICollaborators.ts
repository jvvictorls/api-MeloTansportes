export default interface ICollaborators {
  id: number
  name: string
  address: string
  phone: string
  routeId: number
  firm: 'Eurochem'
  department: 'ADM' | 'PRODUÇÃO' | 'HSE' | 'MANUTENÇÃO' |
  'QUALIDADE' | 'PCP' | 'RH' | 'LOGÍSTICA' | 'CORPORATIVO',
  type: 'SUPERVISOR' | 'COORDENADOR' | 'ASSISTENTE' | 'GERENTE' |
  'DIRETOR' | 'ESTAGIÁRIO' | 'APRENDIZ' | 'TERCEIRIZADO' | 'ANALISTA' | 'OUTRO'
  createdAt: Date
  updatedAt: Date
}
