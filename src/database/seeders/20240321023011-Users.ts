'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
      name: 'João Victor',
      email: 'joao@dev.com',
      password: 'xablau',
      createdAt: new Date(),
      updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {});
  }
};
