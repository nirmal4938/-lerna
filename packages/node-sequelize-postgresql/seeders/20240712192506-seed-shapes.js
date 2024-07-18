export const up = async (queryInterface) => {
  const templates = await queryInterface.sequelize.query(
    'SELECT template_id from templates;'
  );

  const templateRows = templates[0];

  await queryInterface.bulkInsert('shapes', [
    { type: 'rectangle', x: 10, y: 20, width: 100, height: 50, device_id: 1, template_id: templateRows[0].template_id, createdAt: new Date(), updatedAt: new Date() },
    { type: 'circle', x: 30, y: 40, width: 50, height: 50, device_id: 2, template_id: templateRows[1].template_id, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('shapes', null, {});
};
