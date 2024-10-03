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
      name: 'Camila Perez', 
      address: 'Igreja São Sebastião, Anil',
      phone: '98999999999',
      route_id: 3,
      firm: 'Eurochem',
      department: 'ADM',
      type: 'ASSISTENTE',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Lays Silva',
      address: 'Jardins Turu II, Turu',
      phone: '98999999999',
      route_id: 2,
      firm: 'Eurochem',
      department: 'ADM',
      type: 'ANALISTA',
      created_at: new Date(),
      updated_at: new Date(),
    },

   ])
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('collaborators', {})
  }
};
