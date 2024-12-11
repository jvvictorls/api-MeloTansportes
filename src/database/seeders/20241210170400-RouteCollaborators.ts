'use strict'

import { QueryInterface, Sequelize } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('routes_collaborators', [
      {
        route_id: 1,
        collaborator_id: 1
      },
      {
        route_id: 1,
        collaborator_id: 2
      },
      {
        route_id: 1,
        collaborator_id: 3
      },
      
    ])
  },
  down: async (queryInterface: QueryInterface) => {
   await queryInterface.bulkDelete('routes_collaborators', {})
  }
}