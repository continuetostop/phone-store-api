const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const ProductDetail = require('../models/ProductDetail.model');
const GroupProduct = require('../models/GroupProduct.model');

module.exports = {
    create: async (groupProductId, data, options, callback) => {
        //console.log(groupProductId);
        try {

            if (!Pieces.ValidTypeCheck(groupProductId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_group_product_id', 400, 'group product id is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.price, 'String', 0, 20) || !Validator.isDecimal(data.price)) {
                return callback(1, 'invalid_group_product_detail_price', 400, 'group product price is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.image, 'String')) {
                return callback(1, 'invalid_group_product_detail_image', 400, 'group product image is not a string', null);
            }
            let productDetalData = {};
            productDetalData.price = data.price;
            productDetalData.image = data.image;
            let resultGroupProduct;
            let resultProductDetail;
            let result;
            let optionId;
            let valueOption;
            resultGroupProduct = await GroupProduct.findByPk(groupProductId)
            resultProductDetail = await ProductDetail.create(productDetalData);


            resultGroupProduct.addProduct_details([resultProductDetail.id]);
            options.map(async (option) => {
                try {
                    let dataOption = await JSON.parse(option);
                    optionId = dataOption.id;
                    valueOption = dataOption.value;
                    result = await resultProductDetail.addOptions([optionId], { through: { value: valueOption } })
                } catch (err) {
                    console.log(err);
                }
            })
            return callback(null, null, 200, null, resultProductDetail);
        } catch (error) {
            return callback(1, 'create_product_detail_fail', 420, error, null);
        }
    },
    getOne: async (id, callback) => {
        try {
            let resultProductDetail;
            if (!Pieces.ValidTypeCheck(id.groupProductId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_group_product_id', 400, 'group product id is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(id.productDetailId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_product_detail_id', 400, 'product detail id is not a interger', null);
            }
            let where = { id: id };
            try {
                resultProductDetail = await ProductDetail.findOne({
                    where: where,
                    attributes: attributes
                })
                return callback(null, null, 200, null, result);
            }
            catch (error) {
                return callback(1, 'invail_message', 403, error, null);
            };

        } catch (error) {
            return callback(1, 'invail_message', 400, error, null);
        }
    },
    getAll: async (query, callback) => {
        try {
            let where = {};
            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;
            let resultProductDetail;
            if (Pieces.ValidTypeCheck(query.q, 'String')) {
                where.title = { [Sequenlize.Op.like]: query.q };
            }

            if ((Pieces.ValidTypeCheck(query['page'], 'String') && Validator.isDecimal(query['page']))
                || (Pieces.ValidTypeCheck(query['page'], 'Number'))
            ) {
                page = parseInt(query['page']);
                if (page === 0)
                    page = 1;
            }

            if ((Pieces.ValidTypeCheck(query['perPage'], 'String') && Validator.isDecimal(query['perPage']))
                || (Pieces.ValidTypeCheck(query['perPage'], 'Number'))
            ) {
                perPage = parseInt(query['perPage']);
                if (perPage <= 0)
                    perPage = Constant.DEFAULT_PAGING_SIZE;
            }

            let offset = perPage * (page - 1);
            resultProductDetail = ProductDetail.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset
            })
                .then((data) => {
                    let pages = Math.ceil(data.count / perPage);
                    let messages = data.rows;
                    let output = {
                        data: messages,
                        pages: {
                            current: page,
                            prev: page - 1,
                            hasPrev: false,
                            Next: (page + 1) > pages ? 0 : page + 1,
                            hasNext: false,
                            total: pages
                        },
                        items: {
                            begin: ((page * perPage) - perPage) + 1,
                            end: page * perPage,
                            total: data.count
                        }
                    };

                    output.pages.hasNext = (output.pages.next !== 0);
                    output.pages.hasPrev = (output.pages.prev !== 0);
                    return callback(null, null, 200, null, output);
                }).catch(function (error) {
                    return callback(1, 'Find_and_message_all_user_fail', 420, error, null);
                });
        } catch (error) {
            return callback(1, 'Get_all_message-fail', 400, error, null);
        }
    },
    update: async (id, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resultProductDetail;

            if (!(Pieces.ValidTypeCheck(id.groupProductId, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_group_product_id', 400, 'id of group product is not a integer', null);
            }
            if (!(Pieces.ValidTypeCheck(id.productDetailId, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_product_detail_id', 400, 'id of product detail is not a integer', null);
            }

            where.id = productDetailId;
            where.groupProductId = groupProductId;
            if (Pieces.ValidTypeCheck(data.Price, 'String')) {
                update.Price = data.Price;
            }


            try {
                resultProductDetail = await ProductDetail.update(update,
                    { where: where })
                "use strict";
                if (resultProductDetail !== null && (resultProductDetail.length > 0) && (resultProductDetail[0] > 0)) {
                    return callback(null, null, 200, null, id);
                } else {
                    return callback(1, 'Update_product_detail_fail', 400, '', null);
                }
            } catch (error) {
                "use strict";
                return callback(1, 'Update_product_detail_fail', 420, error, null);

            };
        } catch (error) {
            "use strict";
            return callback(1, 'Update_product_detail_fail', 400, error, null);

        }
    },
    delete: async (id, callback) => {
        try {
            let resultProductDetail;
            if (!(Pieces.ValidTypeCheck(id.groupProductId, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_group_product_id', 400, 'id of group product is not a integer', null);
            }
            if (!(Pieces.ValidTypeCheck(id.productDetailId, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_product_detail_id', 400, 'id of product detail is not a integer', null);
            }
            let where = { id: id.productDetailId ,groupProductId: id.groupProductId };
            try {
                resultProductDetail= await ProductDetail.destroy({ where: where })
                return callback(null, null, 200, null, resultProductDetail);

            } catch (error) {
                return callback(1, 'Delete_product_detail_fail', 420, error);
            }
        }
        catch (error) {
            return callback(1, 'Delete_product_detail_fail', 400, error);

        }
    }

}