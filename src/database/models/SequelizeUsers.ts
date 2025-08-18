import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeRefreshToken from './SequelizeRefreshToken';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare type: 'admin' | 'user' | 'driver' | 'superadmin' | 'supervisor' | 'coordinator' | 'manager';
}

SequelizeUsers.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('admin', 'user', 'driver', 'superadmin', 'supervisor', 'coordinator', 'manager'),
    defaultValue: 'user',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

SequelizeUsers.hasMany(SequelizeRefreshToken, {foreignKey: 'userId' as 'refreshToken'});
SequelizeRefreshToken.belongsTo(SequelizeUsers, {foreignKey: 'userId' as 'user'})

export default SequelizeUsers;
