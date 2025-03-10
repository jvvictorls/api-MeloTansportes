import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import db from '.'

class SequelizeRefreshToken extends Model<InferAttributes<SequelizeRefreshToken>,
 InferCreationAttributes<SequelizeRefreshToken>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare expiresIn: Date;
  declare createdAt: Date;
 }

 SequelizeRefreshToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
    field: 'user_id',
  },
  token: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiresIn: {
    type: DataTypes.DATE,
    allowNull:false,
    field: 'expires_in'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  }
 }, {
  modelName: 'refresh_token',
  tableName: 'refresh_token',
  sequelize: db,
  underscored: true,
  timestamps: false,
 })

 export default SequelizeRefreshToken