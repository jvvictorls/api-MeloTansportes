import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('extraRoutes', [
    {
      date: new Date(),
      cost_center: 'Development',
      user_id: 1, // Supondo que Alice Johnson é o userId 1
      driver: 'Carlos Diaz',
      client: 'Euorchem',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      date: new Date(),
      cost_center: 'Design',
      user_id: 2, // Supondo que Bob Smith é o userId 2
      driver: 'Carlos Diaz',
      client: 'Euorchem',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('extraRoutes', {});
}
