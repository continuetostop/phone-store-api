const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const Category = require('../models/Category.model');

module.exports = {
    create: (data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_category_name', 400, 'category name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.description, 'String')) {
                return callback(1, 'invalid_category_description', 400, 'category description is not a string', null);
            }
            let categoryData = {};
            categoryData.name = data.name;
            categoryData.description = data.description;
            Category.create(categoryData).then(result => {
                'use strict';
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'create_category_fail', 420, error, null);
            });


        } catch (error) {
            return callback(1, 'create_category_fail', 400, error, null);
        }
    },
    getOne: (id, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'invalid_category_id', 400, 'id of category is not a integer', null);
            }
            let where = { id: id };
            // let attributes = ['id', 'title', 'content', 'createdAt', 'updatedAt'];

            Category.findOne({
                where: where,
                // attributes: attributes
            }).then(result => {
                'use strict';
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'invail_category', 403, error, null);
            });

        } catch (error) {
            return callback(1, 'invail_category', 400, error, null);
        }
    },
    getAll: (query, callback) => {
        try {
            if (Pieces.ValidTypeCheck(query.q, 'String')) {
                where.name = { [Sequenlize.Op.like]: query.q };
            }
            let where = {};
            Category.findAndCountAll({
                where: where,
            })
                .then((data) => {

                    return callback(null, null, 200, null, data);
                }).catch(function (error) {
                    return callback(1, 'Find_and_get_all_category_fail', 420, error, null);
                });
        } catch (error) {
            return callback(1, 'Find_and_get_all_category_fail', 400, error, null);
        }
    },
    update: (id, data, callback) => {
        try {
            let update = {};
            let where = {};
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

            Category.update(update,
                { where: where }).then(result => {
                    "use strict";
                    if (result !== null && (result.length > 0) && (result[0] > 0)) {
                        return callback(null, null, 200, null, id);
                    } else {
                        return callback(1, 'Update_category_fail', 400, '', null);
                    }
                }).catch(function (error) {
                    "use strict";
                    return callback(1, 'Update_category_fail', 420, error, null);

                });
        } catch (error) {
            "use strict";
            return callback(1, 'Update_category_fail', 400, error, null);

        }
    },
    delete: function (id, callback) {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_category_id', 400, 'id of category is not a integer', null);
            }
            let where = { id: id };
            Category.destroy({ where: where }).then(result => {
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'Delete_category_fail', 420, error);
            });
        }
        catch (error) {
            return callback(1, 'Delete_category_fail', 400, error);

        }
    }

}