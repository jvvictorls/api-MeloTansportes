import {
  DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize'
import db from '.'

export class RoutesCollaborators extends Model<InferAttributes<RoutesCollaborators>, InferCreationAttributes<RoutesCollaborators>> {
  declare id: CreationOptional<number>
  declare routeId: number
  declare collaboratorId: number
  declare boardingTime: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

RoutesCollaborators.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  routeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'route_id',
    references: {
      model: 'routes',
      key: 'id'
    }
  },
  collaboratorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'collaborators',
      key: 'id'
    },
    field: 'collaborator_id',
  },
  boardingTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'boarding_time',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at',
  },
},{
  sequelize: db,
  underscored: true,
  tableName: 'routes_collaborators',
  timestamps: true,
})


export default RoutesCollaborators;