import {
  QueryInterface,
  Sequelize
} from 'sequelize';


/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('extra_routes', [
      {
        id: 1,
        cost_center: 'ADM',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        cost_center: 'PROD',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('extra_routes', {});
  }

};