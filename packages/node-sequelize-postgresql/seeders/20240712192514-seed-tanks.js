export const up = async (queryInterface) => {
  const shapes = await queryInterface.sequelize.query(
    'SELECT shape_id from shapes;'
  );

  const shapeRows = shapes[0];

  await queryInterface.bulkInsert('tanks', [
    { tank_type: 'ESR', software_device_id: 'device1', client_id: 1, location_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { tank_type: 'GSR', software_device_id: 'device2', client_id: 2, location_id: 2, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('tanks', null, {});
};
