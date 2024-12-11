import { QueryInterface } from "sequelize";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('routes', [
      {
        name: 'Rota A1',
        driver: 'Wanderson Araújo',
        client: 'Eurochem',
        max_collaborators: 15,
        shift: 'A',
        period: 'Manhã',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota A2',
        driver: 'João Moreno',
        client: 'Eurochem',
        shift: 'A',
        Perído: 'Manhã',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota A3',
        driver: 'Felipe Eduardo',
        client: 'Eurochem',
        shift: 'B',
        period: 'Tarde',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('routes', {});
  }
}