'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
   await queryInterface.bulkInsert('collaborators', [
    {
      name: 'Fernanda Silva',
      neighborhood: 'Anil',
      city: 'São Luís',
      street: 'Rua projetada',
      number: 'Ecopark IV',
      phone: '98999999999',
      company: 'Eurochem',
      department: 'ADM',
      position: 'SUPERVISOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Camila Perez', 
      neighborhood: 'Cruzeiro do Anil',
      city: 'São Luís',
      street: 'Avenida São Sebastião',
      number: '1',
      phone: '98999999999',
      company: 'Eurochem',
      department: 'ADM',
      position: 'ASSISTENTE',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Lays Silva',
      neighborhood: 'Miritiua',
      city: 'São José de Ribamar',
      street: 'Rua 1',
      number: 'Jardins do Turu II',
      phone: '98999999999',
      company: 'Eurochem',
      department: 'ADM',
      position: 'ANALISTA',
      created_at: new Date(),
      updated_at: new Date(),
    },

   ])
  },

  async down (queryInterface: QueryInterface, Sequelize: Sequelize) {
    await queryInterface.bulkDelete('collaborators', {})
  }
};
