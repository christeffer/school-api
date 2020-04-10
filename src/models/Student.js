import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name needs a 3 to 255 characters',
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Name needs a 3 to 255 characters',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email already exists',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email',
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Age should be a integer number',
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Height should be a number',
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Weight should be a number',
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'student_id' });
  }
}
