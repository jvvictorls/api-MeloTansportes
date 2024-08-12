'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
   await queryInterface.bulkInsert('collaborators', [
    {
      name: 'Fernanda Silva',
      address: 'Ecopark Iv, Anil',
      phone: '98999999999',
      route_id: 1,
      firm: 'Eurochem',
      department: 'ADM',
      type: 'SUPERVISOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Olívia Lopes', 
      address: 'Rua Oswaldo Cruz, Anil',
      phone: '98999999999',
      route_id: 1,
      firm: 'Cibra',
      department: 'ADM',
      type: 'SUPERVISOR',
      created_at: new Date(),
      updated_at: new Date(),
    },

   ])
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('collaborators', {})
  }
};
