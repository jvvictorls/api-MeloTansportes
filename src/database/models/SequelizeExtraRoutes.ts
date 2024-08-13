import {
  Model, 
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import db from '.'
import SequelizeCollaborators from './SequelizeCollaborators'


class SequelizeExtraRoutes extends Model<InferAttributes<SequelizeExtraRoutes>,
 InferCreationAttributes<SequelizeExtraRoutes>> {
  declare id: CreationOptional<number>
  declare costCenter: string
  declare createdAt: Date
  declare updatedAt: Date
}

SequelizeExtraRoutes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  costCenter: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cost_center'
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
  }
}, {
  sequelize: db,
  tableName: 'extra_routes'
})

SequelizeExtraRoutes.hasMany(SequelizeCollaborators, { foreignKey: 'id', as : 'collaborators' })
SequelizeExtraRoutes.hasOne(SequelizeCollaborators, { foreignKey: 'id', as : 'solicitant' })

export default SequelizeExtraRoutes