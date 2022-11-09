const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let Option = MySequenlize.define('option', {

    name: {
        type: Sequelize.STRING(64),
        allowNull: false
    }, 
    unit: {
        type: Sequelize.STRING(256),
        allowNull: false
    }
});
module.exports=Option;

