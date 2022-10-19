module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
      teamName: { allownull: false, type: Sequelize.STRING, field: 'team_name' },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
