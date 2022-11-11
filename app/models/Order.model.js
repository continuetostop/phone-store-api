const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let Order = MySequenlize.define('Order', {

    total: {
        type: Sequelize.BIGINT(64),
        allowNull: false,
        defaultValue:0
    }, 
});
module.exports=Order;

