const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let Order = MySequenlize.define('Orders', {

    total: {
        type: Sequelize.BIGINT(64),
        allowNull: false,
        defaultValue:0
    }, 
    StatusCurrent: {
        type: Sequelize.STRING(64),
        allowNull: false,
        defaultValue:0
    }, 
    note: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue:0
    }, 
});
module.exports=Order;

