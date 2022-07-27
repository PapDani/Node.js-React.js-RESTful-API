module.exports = (sequelize, Sequelize) => {
    const Emails = sequelize.define("emailek", {
      id: {
        type: Sequelize.DOUBLE
      },
      subjectid: {
        type: Sequelize.DOUBLE
      },
      nev: {
        type: Sequelize.VARCHAR(100)
      },
      telefonszam: {
        type: Sequelize.VARCHAR(13)
      },
      email: {
        type: Sequelize.VARCHAR(100)
      },
      leiras: {
        type: Sequelize.VARCHAR(500)
      },
      datum: {
        type: Sequelize.VARCHAR(255)
      },
      generaltemailid: {
        type: Sequelize.VARCHAR(255)
      },
    });
    return Emails;
  };