'use strict';

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: Sequelize) {
   await queryInterface.bulkInsert('collaborators', [
    {
      admission_date: new Date(),
      name: 'Fernanda Silva',
      shift: 'A',
      phone: '98999999999',
      zip_code: '65000-000',
      city: 'São Luís',
      neighborhood: 'Anil',
      street: 'Rua projetada',
      number: 'Ecopark IV',
      company: 'Eurochem',
      department: 'ADM',
      position: 'SUPERVISOR',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      admission_date: new Date(),
      name: 'Camila Perez',
      shift: 'B',
      phone: '98999999999',
      zip_code: '65000-000',
      city: 'São Luís',
      neighborhood: 'Cruzeiro do Anil',
      street: 'Avenida São Sebastião',
      number: '1',
      company: 'Eurochem',
      department: 'ADM',
      position: 'ASSISTENTE',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      admission_date: new Date(),
      name: 'Lays Silva',
      shift: 'ADM',
      phone: '98999999999',
      zip_code: '65000-000',
      city: 'São José de Ribamar',
      neighborhood: 'Miritiua',
      street: 'Rua 1',
      number: 'Jardins do Turu II',
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
