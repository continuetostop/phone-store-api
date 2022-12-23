const Sequelize = require("sequelize");
const MySequenlize = require("../utils/Sequelize");

let Role = MySequenlize.define("roles", {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
});

module.exports = Role;
