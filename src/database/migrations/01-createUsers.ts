import {QueryInterface, DataTypes, Model} from 'sequelize';
import  IUsers  from '../../Interfaces/Users/IUsers';
export default {
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<IUsers>>('users', {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('admin', 'user', 'driver', 'superadmin', 'supervisor', 'coordinator', 'manager'),
                allowNull: false,
            }
        });
    },  
    down(queryInterface: QueryInterface,) {
        return queryInterface.dropTable('users');
    }
    
}