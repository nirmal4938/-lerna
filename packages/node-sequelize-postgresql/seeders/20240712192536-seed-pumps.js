export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('pumps', [
    { software_device_id: 'device7', client_id: 1, location_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { software_device_id: 'device8', client_id: 2, location_id: 2, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('pumps', null, {});
};
