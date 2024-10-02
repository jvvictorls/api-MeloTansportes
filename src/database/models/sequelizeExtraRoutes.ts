import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeCollaborators from './SequelizeCollaborators';

class SequelizeExtraRoutes extends Model<InferAttributes<SequelizeExtraRoutes>,
InferCreationAttributes<SequelizeExtraRoutes>> {
  declare id: CreationOptional<number>;
  declare origin: string;
  declare destination: string;
  declare userId: number;
  declare date: Date;
  declare time: string;
  declare costCenter: string;
  declare driver: string;
  declare client: string;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare collaborators: NonAttribute<
  {
    id: number;
    name: string;
    extra_routes_collaborators: {
      createdAt: Date;
      updatedAt: Date;
      extra_route_id: number;
      collaboratorId: number;
    }
  }[]
  >;

  declare user: NonAttribute<{
    id: number;
    name: string;
  }>;
}

SequelizeExtraRoutes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  costCenter: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cost_center',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  driver: {
    type: DataTypes.STRING,
  },
  client: {
    type: DataTypes.STRING,
    defaultValue: 'Eurochem',
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
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
  tableName: 'extra_routes',
  underscored: true,
  timestamps: true,
});

SequelizeExtraRoutes.belongsTo(SequelizeUsers, { foreignKey: 'userId', as: 'user' });

SequelizeExtraRoutes.belongsToMany(SequelizeCollaborators, {
  through: 'extra_routes_collaborators',
  foreignKey: 'extra_route_id',
  as: 'collaborators',
});
SequelizeCollaborators.belongsToMany(SequelizeExtraRoutes, {
  through: 'extra_route_collaborators',
  foreignKey: 'collaborator_id',
  as: 'extraRoutes',
});

export default SequelizeExtraRoutes;
