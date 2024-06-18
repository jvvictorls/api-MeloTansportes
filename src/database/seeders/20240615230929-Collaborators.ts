'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
   await queryInterface.bulkInsert('collaborators', [
    {
      name: 'Fernanda Silva',
      address: 'Ecopark Iv, Anil'
    },
    {
      name: 'Olívia Lopes', 
      address: 'Rua Oswaldo Cruz, Anil',
    }
   ])
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('collaborators', {})
  }
};
