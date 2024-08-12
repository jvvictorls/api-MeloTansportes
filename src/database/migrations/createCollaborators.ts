import { QueryInterface, DataTypes, Model } from "sequelize";
import ICollaborators from "../../Interfaces/collaborators/ICollaborators";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ICollaborators>>('collaborators', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
        allowNull: false,
      },
      routeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('collaborators')
  }
}