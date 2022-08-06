module.exports = {
    HOST: "mysql.nethely.hu",
    USER: "pshungary",
    PASSWORD: "KozosAdatbazis2",
    DB: "pshungary",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };