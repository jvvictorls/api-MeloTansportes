import { QueryInterface, Sequelize } from "sequelize";
import IVehicles from "../../Interfaces/Vehicles/IVehicles";
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('vehicles', <IVehicles[]>[
      {
        id: 1,
        brand: 'Toyota',
        model: 'Etios',
        plate: 'PTH-9831',
        color: 'Prata',
        fuel: 'Gasolina',
        manufactureYear: 2018,
        modelYear: 2019,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2, 
        brand: 'Renault',
        model: 'Master',
        plate: 'SMP8G34',
        color: 'Branco',
        fuel: 'Diesel',
        manufactureYear: 2020,
        modelYear: 2020,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3, 
        brand: 'Renault',
        model: 'Master',
        plate: 'SMP8G13',
        color: 'Branco',
        fuel: 'Diesel',
        manufactureYear: 2020,
        modelYear: 2020,
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
},
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('vehicles', {})
  }
}