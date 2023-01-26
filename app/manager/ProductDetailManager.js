const Validator = require("validator");
const Sequenlize = require("sequelize");

const Constant = require("../utils/Constant");
const Pieces = require("../utils/Pieces");

const ProductDetail = require("../models/ProductDetail.model");
const GroupProduct = require("../models/GroupProduct.model");
const Option = require("../models/Option.model");

module.exports = {
    create: async (groupProductId, data, options, callback) => {
        //console.log(groupProductId);
        try {
            if (
                !Pieces.ValidTypeCheck(groupProductId, "String", 0, 20) ||
                !Validator.isDecimal(groupProductId)
            ) {
                return callback(
                    1,
                    "Group product id is not a interger.",
                    null,
                    400
                );
            }
            if (
                !Pieces.ValidTypeCheck(data.price, "String", 0, 20) ||
                !Validator.isDecimal(data.price)
            ) {
                return callback(
                    1,
                    "Product detail price is not a interger.",
                    null,
                    400
                );
            }
            if (!Pieces.ValidTypeCheck(data.image, "String")) {
                return callback(
                    1,
                    "Product detail image is invaild.",
                    null,
                    400
                );
            }
            let { price, image } = data;
            let productDetalData = { price, image };
            let resultGroupProduct;
            let resultProductDetail;
            let result;
            let optionId;
            let valueOption;
            resultGroupProduct = await GroupProduct.findByPk(groupProductId);
            resultProductDetail = await ProductDetail.create(productDetalData);

            resultGroupProduct.addProduct_details([resultProductDetail.id]);
            let resultDataProductDetail = { ...resultGroupProduct.dataValues };
            resultDataProductDetail.option = {};
            options.map(async (option) => {
                try {
                    let dataOption;
                    if (typeof option == "object") {
                        dataOption = option;
                    } else {
                        dataOption = await JSON.parse(option);
                    }
                    optionId = dataOption.id;
                    valueOption = dataOption.value;
                    result = await resultProductDetail.addOptions([optionId], {
                        through: { value: valueOption },
                    });
                } catch (err) {
                    console.log(err);
                }
            });
            return callback(
                0,
                "Product detail is successfull.",
                resultProductDetail,
                200
            );
        } catch (error) {
            return callback(1, "Product detail is unsuccessfull.", null, 400);
        }
    },
    getOne: async (id, callback) => {
        try {
            if (
                !Pieces.ValidTypeCheck(id, "String", 0, 20) ||
                !Validator.isDecimal(id)
            ) {
                return callback(
                    1,
                    "Product detail id is not a interger.",
                    null,
                    400
                );
            }
            let where = { id: id };
            let resultProductDetail;

            try {
                resultProductDetail = await ProductDetail.findOne({
                    where: where,
                    include: GroupProduct,
                });
                return callback(
                    0,
                    "Get product detail is successfull.",
                    resultProductDetail,
                    200
                );
            } catch (error) {
                return callback(
                    1,
                    "Get product detail is unsuccessfull.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Get product detail is unsuccessfull.",
                null,
                400
            );
        }
    },
    update: async (productDetailId, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resultProductDetail;

            if (
                !(
                    Pieces.ValidTypeCheck(productDetailId, "String", 0, 20) &&
                    Validator.isDecimal(productDetailId)
                )
            ) {
                return callback(
                    1,
                    "Id of product detail is not a interger.",
                    null,
                    400
                );
            }
            if (
                Pieces.ValidTypeCheck(data.price, "String") &&
                Validator.isDecimal(data.price)
            ) {
                update.price = data.price;
            }
            if (Pieces.ValidTypeCheck(data.image, "String")) {
                update.image = data.image;
            }
            where.id = productDetailId;

            try {
                resultProductDetail = await ProductDetail.update(update, {
                    where: where,
                });
                if (
                    resultProductDetail !== null &&
                    resultProductDetail.length > 0 &&
                    resultProductDetail[0] > 0
                ) {
                    return callback(
                        0,
                        "Update product detail is successfull.",
                        resultProductDetail,
                        200
                    );
                } else {
                    return callback(
                        1,
                        "Update product detail is unsuccessfull.",
                        null,
                        400
                    );
                }
            } catch (error) {
                return callback(
                    1,
                    "Update product detail is unsuccessfull.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Update product detail is unsuccessfull.",
                null,
                400
            );
        }
    },
    delete: async (id, callback) => {
        try {
            let resultProductDetail;

            if (
                !(
                    Pieces.ValidTypeCheck(id, "String", 0, 20) &&
                    Validator.isDecimal(id)
                )
            ) {
                return callback(
                    1,
                    "Id of product detail is not a interger.",
                    null,
                    400
                );
            }
            let where = { id: id };
            try {
                resultProductDetail = await ProductDetail.destroy({
                    where: where,
                });
                if (resultProductDetail > 0) {
                    return callback(
                        0,
                        "Delete product detail is successfull.",
                        null,
                        200
                    );
                } else {
                    return callback(
                        1,
                        "Delete product detail is unsuccessfull.",
                        null,
                        400
                    );
                }
            } catch (error) {
                return callback(
                    1,
                    "Delete product detail is unsuccessfull.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Update product detail is unsuccessfull.",
                null,
                400
            );
        }
    },
};
