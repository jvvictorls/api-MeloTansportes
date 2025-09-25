import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import db from '.'
import SequelizeVehicles from './SequelizeVehicles'

export default class SequelizeSupplies extends Model<
  InferAttributes<SequelizeSupplies>,
  InferCreationAttributes<SequelizeSupplies>
> {
  declare id: CreationOptional<number>
  declare vehicle_id: number
  declare name: string
  declare quantity: number
  declare unity: string
  declare unity_price: number
  declare total_price: number
  declare fiscal_note: string
  declare created_at: Date
  declare updated_at: Date
}

SequelizeSupplies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'vehicle_id',
      references: { 
        model: 'vehicles',
        key: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
     unity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unity_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fiscal_note: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    underscored: true,
    tableName: 'supplies',
    timestamps: false
  }
)

