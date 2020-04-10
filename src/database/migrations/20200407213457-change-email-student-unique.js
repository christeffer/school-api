module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('students', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
