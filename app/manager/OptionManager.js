const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const Option = require('../models/Option.model');
const GroupProduct = require('../models/GroupProduct.model');

module.exports = {
    create: async (groupProductId, data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_option_name', 400, 'option name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.unit, 'String')) {
                return callback(1, 'invalid_option_description', 400, 'option description is not a string', null);
            }
            let optionData = {};
            let resultOption;
            let resultGroupProduct;
            optionData.name = data.name;
            optionData.unit = data.unit;

            try {
                resultGroupProduct = await GroupProduct.findByPk(groupProductId)

                resultOption = await Option.create(optionData);
                resultGroupProduct.Option([resultOption.id]);

                return callback(null, null, 200, null, resultOption);
            } catch (error) {
                return callback(1, 'create_option_for_group_product_fail', 420, error, null);
            };

        } catch (error) {
            return callback(1, 'create_option_for_group_product_fail', 400, error, null);
        }
    },
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

    update: async (groupProductId, id, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resultOption;
            if (!(Pieces.ValidTypeCheck(groupProductId, id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_option_id', 400, 'Id of option is not a integer', null);
            }
            where.id = id;
            if (Pieces.ValidTypeCheck(data.name, 'String')) {
                update.name = data.name;
            }
            if (Pieces.ValidTypeCheck(data.unit, 'String')) {
                update.unit = data.unit;
            }
            try {
                resultOption = await Option.update(update, { where: where })
                if (resultOption !== null && (resultOption.length > 0) && (resultOption[0] > 0)) {
                    return callback(null, null, 200, null, id);
                } else {
                    return callback(1, 'Update_Option_fail', 400, '', null);
                }
            }
            catch (error) {
                "use strict";
                return callback(1, 'Update_Option_fail', 420, error, null);

            }
        } catch (error) {
            "use strict";
            return callback(1, 'Update_category_fail', 400, error, null);

        }
    },
    delete: async function (groupProductId, id, callback) {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_option_id', 400, 'id of option is not a integer', null);
            }
            let resultOption;
            let where = { id: id, groupProductId: groupProductId };
            try {
                resultOption = await Option.destroy({ where: where })
                return callback(null, null, 200, null, resultOption);

            } catch (error) {
                return callback(1, 'Delete_option_fail', 420, error);
            }
        }
        catch (error) {
            return callback(1, 'Delete_option_fail', 400, error);

        }
    }

}