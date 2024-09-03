import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeCollaborators from './SequelizeCollaborators';

class SequelizeExtraRoutes extends Model<InferAttributes<SequelizeExtraRoutes>, InferCreationAttributes<SequelizeExtraRoutes>> {
  declare id: CreationOptional<number>;
  declare userId: Number;
  declare date: Date;
  declare costCenter: String;
  declare driver: String;
  declare client: String;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare collaborators: NonAttribute<[
    {
      id: Number;
      name: String;
      extra_routes_collaborators: {
        createdAt: Date;
        updatedAt: Date;
        extra_route_id: Number;
        collaboratorId: Number;
      }
    }
  ]>;
  declare user: NonAttribute<{
    id: Number;
    name: String;
  }>;
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