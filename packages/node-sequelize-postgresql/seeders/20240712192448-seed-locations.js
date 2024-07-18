export const up = async (queryInterface) => {
  const clients = await queryInterface.sequelize.query(
    'SELECT client_id from clients;'
  );

  const clientRows = clients[0];

  await queryInterface.bulkInsert('locations', [
    { location_name: 'Location A', client_id: clientRows[0].client_id, createdAt: new Date(), updatedAt: new Date() },
    { location_name: 'Location B', client_id: clientRows[1].client_id, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('locations', null, {});
};
