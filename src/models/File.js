import Sequelize, { Model } from 'sequelize';

export default class File extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Originalname can´t be empty',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Filename can´t be empty',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/images/${this.getDataValue(
              'filename'
            )}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'files',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
