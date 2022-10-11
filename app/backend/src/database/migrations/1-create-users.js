module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
      username: { allownull: false, type: Sequelize.STRING },
      role: { allownull: false, type: Sequelize.STRING },
      email: { allownull: false, type: Sequelize.STRING },
      password: { allownull: false, type: Sequelize.STRING },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
