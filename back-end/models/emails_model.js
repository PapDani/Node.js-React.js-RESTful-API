module.exports = (sequelize, Sequelize) => {
    const Emails = sequelize.define("email", {
      id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true,
      },
      subjectid: {
        type: Sequelize.STRING(150)
      },
      firstname: {
        type: Sequelize.STRING(50)
      },
      lastname: {
        type: Sequelize.STRING(50)
      },
      mobilenum: {
        type: Sequelize.STRING(13)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      date: {
        type: Sequelize.STRING(255)
      },
      generatedemailid: {
        type: Sequelize.STRING(255)
      },
    }, {
      timestamps: false
    });
    return Emails;
  };