import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import db from '.'
import SequelizeUsers from './SequelizeUsers';

class SequelizeRefreshToken extends Model<InferAttributes<SequelizeRefreshToken>,
 InferCreationAttributes<SequelizeRefreshToken>> {
  declare id: number;
  declare userId: number;
  declare token: string;
  declare expiresAt: Date;
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
      model: SequelizeUsers,
      key: 'id',
    },
    allowNull: false

  },
  token: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull:false

  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false

  }
 }, {
  modelName: 'refresh_token',
  sequelize: db,
  underscored: true,
  timestamps: false,
 })

 export default SequelizeRefreshToken