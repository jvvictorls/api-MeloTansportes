import { QueryInterface } from "sequelize";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('arrival_routes', [
      {
        name: 'Rota A1',
        driver: 'Wanderson Araújo',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota A2',
        driver: 'João Moreno',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota A3',
        driver: 'Felipe Eduardo',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('arrival_routes', {});
  }
}