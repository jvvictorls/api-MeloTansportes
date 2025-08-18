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
  declare shift: string;
  declare period: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  //Declaração de metodos autogerados pelo sequelize
  declare removeCollaborator: (collaboratorId: number) => void;
  declare addCollaborator: (collaboratorId: number) => void;
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
    defaultValue: 15,
    field: 'max_collaborators',
    allowNull: false,
  },
  shift: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
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
  modelName: 'routes',
  underscored: true,
  timestamps: false,
});

SequelizeRoutes.belongsToMany(SequelizeCollaborators, {
  through: 'routes_collaborators',
  foreignKey: 'route_id',
  timestamps: false,
});
SequelizeCollaborators.belongsToMany(SequelizeRoutes, {
  through: 'routes_collaborators',
  foreignKey: 'collaborator_id',
  timestamps: false,
});


export default SequelizeRoutes;


