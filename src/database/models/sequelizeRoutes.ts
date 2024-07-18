import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import SequelizeCollaborators from './SequelizeCollaborators';


class SequelizeRoutes extends Model<InferAttributes<SequelizeRoutes>, InferCreationAttributes<SequelizeRoutes>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare driver: string;

  declare client: string;
  
  declare collaborators: string;

  declare maxCollaborators: number;

  declare currentCollaborators: number;

}

SequelizeRoutes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  driver: {
    type: DataTypes.STRING,
    allowNull: false
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  collaborators: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'collaborators',
      key: 'name',
    }

  },
  maxCollaborators: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentCollaborators: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'routes',
  underscored: true,
  timestamps: false,
});

SequelizeRoutes.hasMany(SequelizeCollaborators, { foreignKey: 'routeId', as: 'route' });


export default SequelizeRoutes;