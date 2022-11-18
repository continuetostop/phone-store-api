const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let GroupProduct = MySequenlize.define('group_products', {
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    }, 
    // price: {
    //     type: Sequelize.BIGINT(20),
    //     allowNull: false
    // }, 
    description: {
        type: Sequelize.STRING(255),
        allowNull: false
    }, 
    specific:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    services:{
        type: Sequelize.TEXT,
        allowNull: true
    }
    // isdefault:{
    //     type: Sequelize.BOOLEAN,
    //     allowNull:false
    // }
});
module.exports=GroupProduct;

