import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('extra_routes_collaborators', [
    {
      extra_route_id: 1, // Supondo que esta rota extra foi solicitada por Alice Johnson
      collaborator_id: 1, // Supondo que Carlos Diaz é o collaborator_id 1
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      extra_route_id: 1, // Supondo que esta rota extra foi solicitada por Alice Johnson
      collaborator_id: 2, // Supondo que Diana Lee é o collaborator_id 2
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      extra_route_id: 2, // Supondo que esta rota extra foi solicitada por Bob Smith
      collaborator_id: 1, // Supondo que Carlos Diaz é o employeeId 1
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('extra_routes_collaborators', {});
}
