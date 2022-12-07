const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const Option = require('../models/Option.model');
const GroupProduct = require('../models/GroupProduct.model');

module.exports = {
    getOptionByGroupProduct: async (groupProductId, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(groupProductId, 'String', 0, 20) && Validator.isDecimal(groupProductId))) {
                return callback(1, 'invalid_group_product_id', 400, 'id of group product id is not a integer', null);
            }
            let where = { groupProductId: groupProductId };
            let resultOption;
            try {
                resultOption = await Option.findAll({
                    where: where,
                    attributes: ['id', 'name', 'unit']
                })
                return callback(1, 'invail_group_product', 403, error, null);

            } catch (error) {
            }
            return callback(null, null, 200, null, resultOption);

        } catch (error) {
            return callback(1, 'invail_group_product', 400, error, null);
        }
    },



}