const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const Category = require('../models/Category.model');

module.exports = {
    create: async (data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_category_name', 400, 'category name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.description, 'String')) {
                return callback(1, 'invalid_category_description', 400, 'category description is not a string', null);
            }
            let categoryData = {};
            let resultCategory;

            categoryData.name = data.name;
            categoryData.description = data.description;

             try {
                resultCategory = await Category.create(categoryData);
                return callback(null, null, 200, null, resultCategory);
            } catch (error) {
                return callback(1, 'create_category_fail', 420, error, null);
            };
            
        } catch (error) {
            return callback(1, 'create_category_fail', 400, error, null);
        }
    },
    getOne: async (id, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'invalid_category_id', 400, 'id of category is not a integer', null);
            }
            let where = { id: id };
            let resultCategory;
            try {
                resultCategory = await Category.findOne({
                    where: where,
                })
                return callback(null, null, 200, null, resultCategory);
            } catch (error) {
                return callback(1, 'invail_category', 403, error, null);
            }

        } catch (error) {
            return callback(1, 'invail_category', 400, error, null);
        }
    },
    getAll: async (query, callback) => {
        try {
            let resultCategory;
            if (Pieces.ValidTypeCheck(query.q, 'String')) {
                where.name = { [Sequenlize.Op.substring]: query.q };
            }
            let where = {};
            try {
                resultCategory = await Category.findAndCountAll({
                    where: where,
                })
                return callback(null, null, 200, null, resultCategory);

            } catch (error) {
                return callback(1, 'Find_and_get_all_category_fail', 420, error, null);
            }
        } catch (error) {
            return callback(1, 'Find_and_get_all_category_fail', 400, error, null);
        }
    },
    update: async (id, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resCategory;
            let resultCategory;
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_category_id', 400, 'Id of category is not a integer', null);
            }
            where.id = id;
            if (Pieces.ValidTypeCheck(data.name, 'String')) {
                update.name = data.name;
            }
            if (Pieces.ValidTypeCheck(data.description, 'String')) {
                update.description = data.description;
            }
            try {
                resultCategory = await Category.update(update, { where: where })
                if (resultCategory !== null && (resultCategory.length > 0) && (resultCategory[0] > 0)) {
                    return callback(null, null, 200, null, id);
                } else {
                    return callback(1, 'Update_category_fail', 400, '', null);
                }
            }
            catch (error) {
                "use strict";
                return callback(1, 'Update_category_fail', 420, error, null);

            }
        } catch (error) {
            "use strict";
            return callback(1, 'Update_category_fail', 400, error, null);

        }
    },
    delete: async function (id, callback) {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_category_id', 400, 'id of category is not a integer', null);
            }
            let resultCategory;
            let resCategory;
            let where = { id: id };
            try {
                resultCategory = await Category.destroy({ where: where })
                return callback(null, null, 200, null, resultCategory);

            } catch (error) {
                return callback(1, 'Delete_category_fail', 420, error);
            }
        }
        catch (error) {
            return callback(1, 'Delete_category_fail', 400, error);

        }
    }

}