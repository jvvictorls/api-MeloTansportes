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
  declare phone: string;
  declare arrivalRouteId: number;
  declare outboundRouteId: number;
  declare company: string;
  declare department: string;
  declare position: string;
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
  arrivalRouteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'arrival_route_id',
  },
  outboundRouteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'outbound_route_id',
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
  }  
}, {
  sequelize: db,
  modelName: 'collaborators',
  underscored: true,
});

export default SequelizeCollaborators;