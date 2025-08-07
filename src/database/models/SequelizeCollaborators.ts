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
  declare neighborhood: string;
  declare city: string;
  declare street: string;
  declare number: string;
  declare phone: string | undefined;
  declare boardingTime: string;
  declare shift: string | undefined;
  declare company: string;
  declare department: string | undefined;
  declare position: string | undefined;
  declare createdAt: Date;
  declare updatedAt: Date;
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
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  boardingTime: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'boarding_time',
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
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
  shift: ''
}, {
  sequelize: db,
  modelName: 'collaborators',
  underscored: true,
});

export default SequelizeCollaborators;