import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import db from '.'
import SequelizeSupplies from './SequelizeSupplies';

export default class SequelizeVehicles extends Model<InferAttributes<SequelizeVehicles>, InferCreationAttributes<SequelizeVehicles>> {
  declare id: CreationOptional<number>
  declare brand: string
  declare model: string
  declare plate: string
  declare color: string
  declare fuel: string
  declare manufactureYear: number
  declare modelYear: number
  declare created_at: Date
  declare updated_at: Date 
}

SequelizeVehicles.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fuel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufactureYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  modelYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  }
}, {
  sequelize: db,
  underscored: true,
  tableName: 'vehicles'
})

SequelizeVehicles.hasMany(SequelizeSupplies, { foreignKey: 'vehicle_id', as: 'supplies' });
SequelizeSupplies.belongsTo(SequelizeVehicles, { foreignKey: 'vehicle_id', as: 'vehicle' });

  