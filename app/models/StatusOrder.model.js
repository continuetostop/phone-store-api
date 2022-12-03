const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let StatusOrder = MySequenlize.define('status_orders', {
    id: {
        type: Sequelize.BIGINT(20),
        // autoIncrement: true,
        allowNull: false,
        //allowNull: true,
        primaryKey: true
    },
    orderStatusName: {
        type: Sequelize.STRING(64),
        allowNull: false
    }, 
    description: {
        type: Sequelize.STRING(256),
        allowNull: true
    },

});
module.exports=StatusOrder;

