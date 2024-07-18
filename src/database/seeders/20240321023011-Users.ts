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
      type: 'superadmin'
      },
      {
      name: 'Maria Silva',
      email: 'maria@dev.com',
      password: 'senha123',
      type: 'admin'
      },
      {
      name: 'Pedro Oliveira',
      email: 'pedro@dev.com',
      password: '123456',
      type: 'driver'
      },
      {
      name: 'Ana Santos',
      email: 'ana@dev.com',
      password: 'senha1234',
      type: 'user'
      },
      {
      name: 'Lucas Pereira',
      email: 'lucas@dev.com',
      password: 'abcdef',
      type: 'user'
      },
      {
      name: 'Camila Lima',
      email: 'camila@dev.com',
      password: 'senha321',
      type: 'user'
      },
      {
      name: 'Bruno Souza',
      email: 'bruno@dev.com',
      password: '987654',
      type: 'user'
      },
      {
      name: 'Amanda Costa',
      email: 'amanda@dev.com',
      password: 'senha567',
      type: 'user'
      },
      {
      name: 'Gustavo Santos',
      email: 'gustavo@dev.com',
      password: 'senha432',
      type: 'user'
      },
      
      {
      name: 'Juliana Almeida',
      email: 'juliana@dev.com',
      password: '123abc',
      type: 'user'
      },
      
      {
      name: 'Felipe Oliveira',
      email: 'felipe@dev.com',
      password: 'qwerty',
      type: 'user'
      },
  ], {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {});
  }
};
