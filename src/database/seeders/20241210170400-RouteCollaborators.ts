'use strict'

import { QueryInterface, Sequelize } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkInsert('routes_collaborators', [
      {
        route_id: 1,
        collaborator_id: 1,
        boarding_time: '08:00:00'
      },
      {
        route_id: 1,
        collaborator_id: 2,
        boarding_time: '09:00:00'
      },
      {
        route_id: 1,
        collaborator_id: 3,
        boarding_time: '10:00:00'
      },
      {
        route_id: 2,
        collaborator_id: 1,
        boarding_time: '08:30:00'
      },
      {
        route_id: 2,
        collaborator_id: 2,
        boarding_time: '09:30:00'
      },
      {
        route_id: 3,
        collaborator_id: 3,
        boarding_time: '10:30:00'
      }
      
    ])
  },
  down: async (queryInterface: QueryInterface) => {
   await queryInterface.bulkDelete('routes_collaborators', {})
  }
}