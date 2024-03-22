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
      },
      {
      name: 'Maria Silva',
      email: 'maria@dev.com',
      password: 'senha123',
      },
      {
      name: 'Pedro Oliveira',
      email: 'pedro@dev.com',
      password: '123456',
      },
      {
      name: 'Ana Santos',
      email: 'ana@dev.com',
      password: 'senha1234',
      },
      {
      name: 'Lucas Pereira',
      email: 'lucas@dev.com',
      password: 'abcdef',
      },
      {
      name: 'Camila Lima',
      email: 'camila@dev.com',
      password: 'senha321',
      },
      {
      name: 'Bruno Souza',
      email: 'bruno@dev.com',
      password: '987654',
      },
      
      {
      name: 'Amanda Costa',
      email: 'amanda@dev.com',
      password: 'senha567',
      },
      
      {
      name: 'Gustavo Santos',
      email: 'gustavo@dev.com',
      password: 'senha432',
      },
      
      {
      name: 'Juliana Almeida',
      email: 'juliana@dev.com',
      password: '123abc',
      },
      
      {
      name: 'Felipe Oliveira',
      email: 'felipe@dev.com',
      password: 'qwerty',
      },
  ], {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {});
  }
};
