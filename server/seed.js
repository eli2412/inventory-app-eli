const {sauces, items} = require('./seedData.js');

const {sequelize} = require('./db');
const {Sauce} = require('./models');
const { Item } = require('./models')

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(sauces.map(sauce => Sauce.create(sauce)));
        await Promise.all(items.map(items => Item.create(items)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();
