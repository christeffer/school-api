const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'First User',
          email: 'first@one.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Second User',
          email: 'second@two.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
