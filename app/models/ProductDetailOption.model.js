const Sequelize = require("sequelize");
const MySequenlize = require("../utils/Sequelize");

let ProductDetailOption = MySequenlize.define(
    "product_detail_option",
    {
        value: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);
module.exports = ProductDetailOption;
