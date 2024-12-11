import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import SequelizeCollaborators from './SequelizeCollaborators';

class SequelizeRoutes extends Model<InferAttributes<SequelizeRoutes>,
InferCreationAttributes<SequelizeRoutes>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare driver: string;
  declare client: string;
  declare maxCollaborators: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

SequelizeRoutes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  driver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxCollaborators: {
    type: DataTypes.INTEGER,
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
  modelName: 'routes',
  underscored: true,
  timestamps: false,
});

SequelizeRoutes.belongsToMany(SequelizeCollaborators, {
  through: 'routes_collaborators',
  foreignKey: 'route_id',
});
SequelizeCollaborators.belongsToMany(SequelizeRoutes, {
  through: 'routes_collaborators',
  foreignKey: 'collaborator_id',
});


export default SequelizeRoutes;


