import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeCollaborators extends Model<InferAttributes<SequelizeCollaborators>,
InferCreationAttributes<SequelizeCollaborators>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
}

SequelizeCollaborators.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'collaborators',
  timestamps: false,
});
