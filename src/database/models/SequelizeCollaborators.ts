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
  declare phone: string;
  declare routeId: number;
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
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  routeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'routes',
      key: 'id',
    },
    field: 'route_id',
},  
}, {
  sequelize: db,
  modelName: 'collaborators',
  underscored: true,
  timestamps: false,
});

export default SequelizeCollaborators;