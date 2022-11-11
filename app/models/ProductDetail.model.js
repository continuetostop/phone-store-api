const Sequelize = require('sequelize');
const MySequenlize = require('../utils/Sequelize');

let ProductDetail = MySequenlize.define('product_detail', {
    price: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    image: {
        type: Sequelize.DATE,
        allowNull: true
    }

});
module.exports = ProductDetail;

