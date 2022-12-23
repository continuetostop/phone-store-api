const Sequelize = require("sequelize");
const MySequenlize = require("../utils/Sequelize");

let Customer = MySequenlize.define("customers", {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        //allowNull: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    numberPhone: {
        type: Sequelize.STRING(256),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(256),
        allowNull: false,
    },
});
module.exports = Customer;
