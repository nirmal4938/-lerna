export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('clients', [
    { client_name: 'Client A', createdAt: new Date(), updatedAt: new Date() },
    { client_name: 'Client B', createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('clients', null, {});
};
