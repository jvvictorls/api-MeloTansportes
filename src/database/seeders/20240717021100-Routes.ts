import { QueryInterface } from "sequelize";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('routes', [
      {
        name: 'Rota 1',
        driver: 'Motorista 1',
        client: 'Cliente 1',
        collaborators: 'Colaborador 1',
        maxCollaborators: 2,
        currentCollaborators: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rota 2',
        driver: 'Motorista',
        client: 'Cliente 2',
        collaborators: 'Colaborador 2',
        maxCollaborators: 2,
        currentCollaborators: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rota 3',
        driver: 'Motorista',
        client: 'Cliente 3',
        collaborators: 'Colaborador 3',
        maxCollaborators: 2,
        currentCollaborators: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('routes', {});
  }
}