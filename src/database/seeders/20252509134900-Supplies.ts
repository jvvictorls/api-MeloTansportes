import { QueryInterface, Sequelize } from "sequelize";
import ISupplies from "../../Interfaces/Supplies/ISupplies";

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('supplies', <ISupplies[]>[
      {
        id: 1,
        vehicle_id: 1,
        name: 'gasolina',
        unity: 'litros',
        quantity: 28.75,
        unity_price: 5.50,
        total_price: 157.625,
        fiscal_note: 'www.melotransportes.com.br/nota/1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        vehicle_id: 2,
        name: 'diesel',
        unity: 'litros',
        quantity: 100,
        unity_price: 4.50,
        total_price: 450.00,
        fiscal_note: 'www.melotransportes.com.br/nota/2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        vehicle_id: 3,
        name: 'diesel',
        unity: 'litros',
        quantity: 120,
        unity_price: 4.50,
        total_price: 540.00,
        fiscal_note: 'www.melotransportes.com.br/nota/3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        vehicle_id: 1,
        name: 'gasolina',
        unity: 'litros',
        quantity: 40,
        unity_price: 5.50,
        total_price: 220.00,
        fiscal_note: 'www.melotransportes.com.br/nota/4',
        created_at: new Date(),
        updated_at: new Date()
      }


    ])
  },

  down: async (queryInteface: QueryInterface) => {
    await queryInteface.bulkDelete('supplies', {})
  }


}
