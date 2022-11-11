const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let Message = MySequenlize.define('message', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        allowNull: false,
        //allowNull: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(64),
        allowNull: false
    }, 
    content: {
        type: Sequelize.STRING(256),
        allowNull: false
    }, 
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},{
    underscored:false,
    timestamps:false,
    includeDeleted:true,
    paranoid: true,
    freezeTableName:true,
    tableName:'message'
});
module.exports=Message;

