const Validator = require("validator");
const { Op } = require("sequelize");

const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const GroupProduct = require("../models/GroupProduct.model");
const ProductDetail = require("../models/ProductDetail.model");
const Option = require("../models/Option.model");
const Category = require("../models/Category.model");
const handlerRawJson = require("../myfunction/handlerRawJson");
const handerProductDetail = require("../myfunction/handlerProductDetail");

module.exports = {
    create: async (data, options, callback) => {
        try {
            if (
                !Pieces.ValidTypeCheck(data.categoryId, "String", 0, 20) ||
                !Validator.isDecimal(data.categoryId)
            ) {
                return callback(
                    1,
                    "Id of category is not interger.",
                    null,
                    400
                );
            }
            if (!Pieces.ValidTypeCheck(data.name, "String")) {
                return callback(
                    1,
                    "Name group product is not string.",
                    null,
                    400
                );
            }

            if (!Pieces.ValidTypeCheck(data.description, "String")) {
                return callback(
                    1,
                    "Description group product is not string.",
                    null,
                    400
                );
            }

            if (!Pieces.ValidTypeCheck(data.services, "String")) {
                return callback(
                    1,
                    "Services group product is not string.",
                    null,
                    400
                );
            }

            let { name, description, specific, services } = data;
            let groupProductData = {
                name,
                description,
                specific,
                services,
            };
            let resultGroupProduct;
            let resultCategory;
            let resultOption;
            let groupProductId;
            let result;
            let resultGroupProductData;
            // let resultOption;
            resultGroupProduct = await GroupProduct.create(groupProductData);

            groupProductId = resultGroupProduct.id;
            resultCategory = await Category.findByPk(data.categoryId);

            resultCategory.addGroup_products([groupProductId]);
            resultGroupProductData = { ...groupProductData };
            resultGroupProductData.id = resultGroupProduct.id;
            resultGroupProductData.category = resultCategory.name;
            let dataOptionClone;
            dataOptionClone = handlerRawJson(options);
            Promise.all(
                dataOptionClone.map(async (option) => {
                    try {
                        resultOption = await Option.create(option);
                        result = await resultGroupProduct.addOptions([
                            resultOption.id,
                        ]);
                    } catch (err) {
                        return callback(
                            1,
                            "Create group product is unsuccessful.",
                            null,
                            400
                        );
                    }
                })
            );
            resultGroupProductData.options = dataOptionClone;
            return callback(
                0,
                "Create group product is successful.",
                resultGroupProductData,
                201
            );
        } catch (error) {
            console.log(error);
            return callback(
                1,
                "Create group product is unsuccessful.",
                null,
                400
            );
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
                return callback(
                    1,
                    "Id group product is not interger",
                    null,
                    400
                );
            }
            let where = { id: id };
            try {
                let data = await GroupProduct.findOne({
                    where: where,
                    include: {
                        model: ProductDetail,
                        include: {
                            model: Option,
                        },
                    },
                });
                let result = handerProductDetail(data);
                return callback(
                    0,
                    "Get group product is successful.",
                    result,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get group product is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(1, "Get group product is unsuccessful.", null, 400);
        }
    },
    getByCategory: async (id, query, callback) => {
        try {
            let where = { categoryId: id };

            try {
                let data = await GroupProduct.findAndCountAll({
                    where: where,
                    include: ProductDetail,
                });
                let groupProducts = [];

                data.rows.map((i) => {
                    let groupProduct = {};
                    if (i.product_details.length === 0) return;

                    groupProduct.id = i.id;
                    groupProduct.name = i.name;
                    groupProduct.price = +i.product_details[0].price;
                    groupProduct.image = i.product_details[0].image;
                    delete i.product_details;
                    groupProducts.push(groupProduct);
                });

                return callback(
                    0,
                    "Get group product by category is successful.",
                    groupProducts,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get group product by category is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Get group product by category is unsuccessful.",
                null,
                400
            );
        }
    },
    getAll: async (query, callback) => {
        try {
            let where = {};
            if (Pieces.ValidTypeCheck(query.q, "String")) {
                where.name = { [Op.substring]: query.q };
            }

            try {
                let data = await GroupProduct.findAndCountAll({
                    where: where,
                    include: ProductDetail,
                });

                let groupProducts = [];
                data.rows.map((i) => {
                    let groupProduct = {};
                    if (i.product_details.length === 0) return;
                    i.price = i.product_details[0].price;

                    let { id, name } = i;
                    groupProduct = {
                        id,
                        name,
                    };
                    groupProduct.price = parseInt(i.product_details[0].price);
                    groupProduct.image = i.product_details[0].image;
                    groupProducts.push(groupProduct);
                });

                return callback(
                    0,
                    "Get all or find group product is successful.",
                    groupProducts,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get all or find group product is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Get all or find group product is unsuccessful.",
                null,
                400
            );
        }
    },

    update: async (id, data, options, callback) => {
        try {
            let update = {};
            let where = {};
            let result, resultUpdate;
            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 1, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(
                    1,
                    "Id of group product is not a integer.",
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
            if (Pieces.ValidTypeCheck(data.services, "String")) {
                update.services = data.services;
            }

            let dataOptionClone;
            dataOptionClone = handlerRawJson(options);
            try {
                if (
                    !(
                        Object.keys(update).length === 0 &&
                        update.constructor === Object
                    )
                ) {
                    result = await GroupProduct.update(update, {
                        where: where,
                    });

                    if (result !== null && result.length > 0 && result[0] > 0) {
                        resultUpdate = await GroupProduct.findByPk(id);
                    } else {
                        return callback(
                            1,
                            "Update group product is unsuccessful.",
                            null,
                            400
                        );
                    }
                }
            } catch (error) {
                return callback(
                    1,
                    "Update group product is unsuccessful.",
                    null,
                    400
                );
            }

            try {
                if (dataOptionClone) {
                    Promise.all(
                        dataOptionClone?.map(async (option) => {
                            try {
                                let where = {};
                                where.id = option.id;
                                where.groupProductId = id;
                                let update = { ...option };
                                delete update.id;
                                resultOption = await Option.update(update, {
                                    where: where,
                                });
                            } catch (error) {
                                return callback(
                                    1,
                                    "Update group product is unsuccessful.",
                                    null,
                                    410
                                );
                            }
                        })
                    );
                }
            } catch (error) {
                return callback(
                    1,
                    "Update group product is unsuccessful.",
                    null,
                    400
                );
            }
            resultUpdate = await GroupProduct.findByPk(id, {
                include: {
                    model: Option,
                },
            });
            return callback(
                0,
                "Update group product is successful.",
                resultUpdate,
                200
            );
        } catch (error) {
            console.log(error);
            return callback(
                1,
                "Update group product is unsuccessful.",
                error,
                400
            );
        }
    },
    delete: function (id, callback) {
        try {
            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 0, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(
                    1,
                    "Id of group product is not a integer.",
                    update,
                    400
                );
            }
            let where = { id: id };
            GroupProduct.destroy({ where: where })
                .then((result) => {
                    return callback(
                        0,
                        "Delete group product is successful.",
                        result,
                        200
                    );
                })
                .catch(function (error) {
                    return callback(
                        1,
                        "Delete group product is unsuccessful.",
                        null,
                        400
                    );
                });
        } catch (error) {
            return callback(
                1,
                "Delete group product is unsuccessful.",
                null,
                400
            );
        }
    },
    getOptionByGroupProduct: async (groupProductId, callback) => {
        try {
            if (
                !(
                    Pieces.ValidTypeCheck(groupProductId, "String", 0, 20) &&
                    Validator.isDecimal(groupProductId)
                )
            ) {
                return callback(
                    1,
                    "Id of group product is not a integer.",
                    null,
                    400
                );
            }
            let where = { groupProductId: groupProductId };
            let resultOption;
            try {
                resultOption = await Option.findAll({
                    where: where,
                    attributes: ["id", "name", "unit"],
                });
                return callback(
                    0,
                    "Get option by group product is successful.",
                    resultOption,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get option by group product is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Get option by group product is unsuccessful.",
                null,
                400
            );
        }
    },
};
