'use strict';

import { QueryInterface, Sequelize } from "sequelize";
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
      name: 'João Victor',
      email: 'joao@dev.com',
      password: bcrypt.hashSync('xablau', 10),
      type: 'superadmin'
      },
      {
      name: 'Maria Silva',
      email: 'maria@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'admin'
      },
      {
      name: 'Pedro Oliveira',
      email: 'pedro@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'driver'
      },
      {
      name: 'Ana Santos',
      email: 'ana@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'supervisor'
      },
      {
      name: 'Lucas Pereira',
      email: 'lucas@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'coordinator'
      },
      {
      name: 'Camila Lima',
      email: 'camila@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'manager'
      },
      {
      name: 'Bruno Souza',
      email: 'bruno@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'user'
      },
      {
      name: 'Amanda Costa',
      email: 'amanda@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'user'
      },
      {
      name: 'Gustavo Santos',
      email: 'gustavo@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'user'
      },
      
      {
      name: 'Juliana Almeida',
      email: 'juliana@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'user'
      },
      
      {
      name: 'Felipe Oliveira',
      email: 'felipe@dev.com',
      password: bcrypt.hashSync('senha123', 10),
      type: 'user'
      },
  ], {});
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('users', {});
  }
};
