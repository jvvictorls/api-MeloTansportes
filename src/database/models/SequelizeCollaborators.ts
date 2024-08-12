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
  declare firm: 'Eurochem' | 'Cibra';
  declare department: 'ADM' | 'PRODUÇÃO' | 'HSE' | 'MANUTENÇÃO' | 'QUALIDADE' | 'PCP' | 'RH' | 'LOGÍSTICA' | 'CORPORATIVO';
  declare type: 'SUPERVISOR' | 'COORDENADOR' | 'COLABORADOR' | 'GERENTE' | 'DIRETOR' | 'ESTAGIÁRIO' | 'APRENDIZ' | 'TERCEIRIZADO' | 'OUTRO';
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
  firm: {
    type: DataTypes.ENUM('Eurochem', 'Cibra'),
    allowNull: false,
  },
  department: {
    type: DataTypes.ENUM('ADM', 'PRODUÇÃO', 'HSE', 'MANUTENÇÃO', 'QUALIDADE', 'PCP', 'RH', 'LOGÍSTICA', 'CORPORATIVO'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('SUPERVISOR', 'COORDENADOR', 'COLABORADOR', 'GERENTE', 'DIRETOR', 'ESTAGIÁRIO', 'APRENDIZ', 'TERCEIRIZADO', 'OUTRO'),
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