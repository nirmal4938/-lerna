export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('flow_meters', [
    { software_device_id: 'device5', client_id: 1, location_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { software_device_id: 'device6', client_id: 2, location_id: 2, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('flow_meters', null, {});
};
