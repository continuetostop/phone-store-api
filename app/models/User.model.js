const Sequelize =require('sequelize');
const MySequenlize= require('../utils/Sequelize');

let User=MySequenlize.define('users', {
    username:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    password:{
        type: Sequelize.STRING(255),
        allowNull:false
    }
});

module.exports=User;