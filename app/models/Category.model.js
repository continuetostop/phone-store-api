const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let Category = MySequenlize.define('category', {
    name: {
        type: Sequelize.STRING(256),
        allowNull: false
    }, 
    description: {
        type: Sequelize.STRING(256),
        allowNull: false
    }, 
    image: {
        type: Sequelize.STRING(256),
        allowNull: true
    },

});
module.exports=Category;

