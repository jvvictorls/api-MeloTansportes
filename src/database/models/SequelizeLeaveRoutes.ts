import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import db from '.'
import SequelizeCollaborators from './SequelizeCollaborators'

export default class SequelizeLeaveRoutes extends Model<InferAttributes<SequelizeLeaveRoutes>, InferCreationAttributes<SequelizeLeaveRoutes>> {
  declare id: CreationOptional<number>
  declare name: string
  declare driver: string
  declare client: string
  declare maxCollaborators: number
  declare createdAt: Date
  declare updatedAt: Date
}

SequelizeLeaveRoutes.init( {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  driver: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maxCollaborators: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'max_collaborators'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  },
}, {
  sequelize: db,
  modelName: 'leave_routes',
  tableName: 'leave_routes',
  underscored: true
})

SequelizeLeaveRoutes.hasMany(SequelizeCollaborators, {as: 'collaborators', foreignKey: 'outbound_route_id'})