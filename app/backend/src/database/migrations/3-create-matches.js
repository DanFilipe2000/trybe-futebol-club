module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      homeTeam: {
        allownull: false,
        type: Sequelize.INTEGER,
        field: 'home_team',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        allownull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals' },
      awayTeam: {
        allownull: false,
        type: Sequelize.INTEGER,
        field: 'away_team',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        allownull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        allownull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress'
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
