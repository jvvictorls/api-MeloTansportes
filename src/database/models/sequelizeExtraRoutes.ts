import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeCollaborators from './SequelizeCollaborators';

class SequelizeExtraRoutes extends Model<InferAttributes<SequelizeExtraRoutes>, InferCreationAttributes<SequelizeExtraRoutes>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare date: Date;
  declare costCenter: string;
  declare driver: string;
  declare client: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

SequelizeExtraRoutes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
    allowNull: false,
  },
  client: {
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
  }
}, {
  sequelize: db,
  tableName: 'extra_routes',
  underscored: true,
  timestamps: true,
});

SequelizeExtraRoutes.belongsTo(SequelizeUsers, {foreignKey: 'userId', as: 'user'});

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