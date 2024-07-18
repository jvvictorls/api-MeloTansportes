import { QueryInterface } from "sequelize";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('routes', [
      {
        name: 'Rota 1',
        driver: 'Motorista 1',
        client: 'Cliente 1',
        collaborators: 'Colaborador 1',
        max_collaborators: 2,
        current_collaborators: 1,
      },
      {
        name: 'Rota 2',
        driver: 'Motorista',
        client: 'Cliente 2',
        collaborators: 'Colaborador 2',
        max_collaborators: 2,
        current_collaborators: 1,
      },
      {
        name: 'Rota 3',
        driver: 'Motorista',
        client: 'Cliente 3',
        collaborators: 'Colaborador 3',
        max_collaborators: 2,
        current_collaborators: 1,
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('routes', {});
  }
}