const Sequelize = require("sequelize");
const MySequenlize = require("../utils/Sequelize");

let OrderDetail = MySequenlize.define(
    "order_detail",
    {
        nameProduct: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        price: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        qty: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        options: {
            type: Sequelize.JSON,
            allowNull: true,
        },
        subtotal: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);
module.exports = OrderDetail;
