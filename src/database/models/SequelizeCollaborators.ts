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
  declare admissionDate: Date;
  declare name: string;
  declare shift: string | undefined;
  declare phone: string | undefined;
  declare zipCode: string;
  declare city: string;
  declare neighborhood: string;
  declare street: string;
  declare number: string;
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
  admissionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'admission_date',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
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
}, {
  sequelize: db,
  modelName: 'collaborators',
  underscored: true,
});

export default SequelizeCollaborators;