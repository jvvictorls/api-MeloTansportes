import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('extra_routes', [
    {
      origin: 'Fábrica',
      destination: 'Residência',
      date: new Date(),
      time: '08:00',
      cost_center: 'Development',
      user_id: 1, 
      driver: 'Carlos Diaz',
      client: 'Euorchem',
      status: 'completed',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      origin: 'Residência',
      destination: 'Fábrica',
      date: new Date(),
      time: '20:00',
      cost_center: 'Design',
      user_id: 2,
      driver: 'Carlos Diaz',
      client: 'Eurochem',
      status: 'completed',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('extra_routes', {});
}
