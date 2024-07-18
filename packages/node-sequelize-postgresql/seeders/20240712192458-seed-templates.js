export const up = async (queryInterface) => {
  const locations = await queryInterface.sequelize.query(
    'SELECT location_id from locations;'
  );

  const locationRows = locations[0];

  await queryInterface.bulkInsert('templates', [
    { template_name: 'Template A', location_id: locationRows[0].location_id, createdAt: new Date(), updatedAt: new Date() },
    { template_name: 'Template B', location_id: locationRows[1].location_id, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('templates', null, {});
};
