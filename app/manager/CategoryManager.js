const Validator = require("validator");
const Sequenlize = require("sequelize");

const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const Category = require("../models/Category.model");

module.exports = {
    create: async (data, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.name, "String")) {
                return callback(1, "Name category is not string.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.description, "String")) {
                return callback(
                    1,
                    "Description category is not string.",
                    null,
                    400
                );
            }
            let categoryData = {};
            let resultCategory;
            let { name, description } = data;
            categoryData = { name, description };

            try {
                resultCategory = await Category.create(categoryData);
                return callback(
                    0,
                    "Create category is successful.",
                    resultCategory,
                    201
                );
            } catch (error) {
                return callback(
                    1,
                    "Create category is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(1, "Create category is unsuccessful.", null, 400);
        }
    },
    getOne: async (id, callback) => {
        try {
            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 0, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(1, "Name category is not interger.", null, 400);
            }
            let where = { id: id };
            let resultCategory;
            try {
                resultCategory = await Category.findOne({
                    where: where,
                });
                return callback(
                    0,
                    "Get category is successful.",
                    resultCategory,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get category is unsuccessful.",
                    resultCategory,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Get category is unsuccessful.",
                resultCategory,
                400
            );
        }
    },
    getAll: async (query, callback) => {
        try {
            let resultCategory;
            if (Pieces.ValidTypeCheck(query.q, "String")) {
                where.name = { [Sequenlize.Op.substring]: query.q };
            }
            let where = {};
            try {
                resultCategory = await Category.findAndCountAll({
                    where: where,
                });
                return callback(
                    0,
                    "Find or get all category is successful.",
                    resultCategory,
                    400
                );
            } catch (error) {
                return callback(
                    1,
                    "Find or get all category is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Find or get all category is unsuccessful.",
                null,
                400
            );
        }
    },
    update: async (id, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resultCategory;
            let resultUpdate;
            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 0, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(
                    1,
                    "Id of category is not a integer.",
                    null,
                    400
                );
            }
            where.id = id;
            if (Pieces.ValidTypeCheck(data.name, "String")) {
                update.name = data.name;
            }
            if (Pieces.ValidTypeCheck(data.description, "String")) {
                update.description = data.description;
            }
            if (Pieces.ValidTypeCheck(data.image, "String")) {
                update.image = data.image;
            }
            try {
                resultCategory = await Category.update(update, {
                    where: where,
                });
                if (
                    resultCategory !== null &&
                    resultCategory.length > 0 &&
                    resultCategory[0] > 0
                ) {
                    resultUpdate = await Category.findByPk(id);

                    return callback(
                        0,
                        "Update category is successfull.",
                        resultUpdate,
                        200
                    );
                } else {
                    return callback(
                        1,
                        "Update category is unsuccessfull.",
                        null,
                        400
                    );
                }
            } catch (error) {
                callback(1, "Update category is unsuccessfull.", null, 400);
            }
        } catch (error) {
            callback(1, "Update category is unsuccessfull.", null, 400);
        }
    },
    delete: async function (id, callback) {
        try {
            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 0, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(
                    1,
                    "Id of category is not a integer.",
                    null,
                    400
                );
            }
            let resultCategory;
            let where = { id: id };
            try {
                resultCategory = await Category.destroy({ where: where });
                if (resultCategory > 0)
                    return callback(
                        0,
                        "Delete category is successfull.",
                        null,
                        200
                    );
                else {
                    return callback(
                        1,
                        "Delete category is unsuccessfull.",
                        null,
                        400
                    );
                }
            } catch (error) {
                return callback(
                    1,
                    "Delete category is unsuccessfull.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(1, "Delete category is unsuccessfull.", null, 400);
        }
    },
};
