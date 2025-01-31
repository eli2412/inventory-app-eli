const { sauces, items } = require("./seedData.js");
const { sequelize } = require("./db");
const { Sauce, Item, User } = require("./models");

const seed = async () => {
  try {
  
    await sequelize.sync({ force: true });

    // Insert seed data
    await Promise.all(sauces.map((sauce) => Sauce.create(sauce)));
    await Promise.all(items.map((item) => Item.create(item)));

    console.log("Database populated!");
  } catch (error) {
    console.error("Error populating database:", error);
  }
};

seed();
