const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Sauce = sequelize.define("sauces", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
});

const Item = sequelize.define("items", {
  name: Sequelize.STRING,
  price: Sequelize.FLOAT,
  description: Sequelize.STRING,
  category: Sequelize.STRING,
  image: Sequelize.STRING,
});

const User = sequelize.define("users", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  db: sequelize,
  Sauce,
  Item,
  User,
};
