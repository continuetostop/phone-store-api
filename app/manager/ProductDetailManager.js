const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const ProductDetail = require('../models/ProductDetail.model');
const GroupProduct = require('../models/GroupProduct.model');

module.exports = {
    create: (groupProductId, data, options, callback) => {
        //console.log(groupProductId);
        try {

            if (!Pieces.ValidTypeCheck(groupProductId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_group_product_id', 400, 'group product id is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.price, 'String', 0, 20) || !Validator.isDecimal(data.price)) {
                return callback(1, 'invalid_group_product_detail_price', 400, 'group product price is not a interger', null);
            }
            let productDetalData = {};
            productDetalData.price = data.price;
            let resultGroupProduct;
            let resultProductDetail;
            let arraOptionId = [];
            let optionId;
            let valueOption;
            let arrValueOption = [];
            GroupProduct.findByPk(groupProductId).then(result => {
                'use strict';
                return result;
            })
                .then((result) => {
                    resultGroupProduct = result;
                    return ProductDetail.create(productDetalData);

                })

                .then((result) => {
                    resultGroupProduct.addProduct_details([result.id]);
                    resultProductDetail = result;
                    Promise.all(
                        options.map((option) => {
                            try {
                                let dataOption = JSON.parse(option);
                                arraOptionId.push(dataOption.id);
                                arrValueOption.push(dataOption.value);
                                optionId = arraOptionId.shift();
                                valueOption = arrValueOption.shift();

                                resultProductDetail.addOptions([optionId], { through: { value: valueOption } })
                                   

                                    .catch((err) => {
                                        console.log(err);
                                    })

                            } catch (err) {
                                console.log(err);
                            }
                        }))

                })
                .then((result) => {
                    return callback(null, null, 200, null, '');

                })
                .catch(function (error) {
                    return callback(1, 'create_product_detail_fail', 420, error, null);
                });


        } catch (error) {
            return callback(1, 'create_product_detail_fail', 400, error, null);
        }
    },
    getOne: (id, data, options, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(id.groupProductId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_group_product_id', 400, 'group product id is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(id.productDetailId, 'String', 0, 20) || !Validator.isDecimal(groupProductId)) {
                return callback(1, 'invalid_product_detail_id', 400, 'product detail id is not a interger', null);
            }
            let where = { id: id };

            ProductDetail.findOne({
                where: where,
                attributes: attributes
            }).then(result => {
                'use strict';
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'invail_message', 403, error, null);
            });

        } catch (error) {
            return callback(1, 'invail_message', 400, error, null);
        }
    },
    getAll: (query, callback) => {
        try {
            let where = {};
            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;
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
            ProductDetail.findAndCountAll({
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
    update: (id, data, callback) => {
        try {
            let update = {};
            let where = {};
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_message_id', 400, 'Id of message is not a integer', null);
            }

            where.id = id;
            if (Pieces.ValidTypeCheck(data.title, 'String')) {
                update.title = data.title;
            }
            if (Pieces.ValidTypeCheck(data.content, 'String')) {
                update.content = data.content;
            }

            update.updatedAt = new Date();
            ProductDetail.update(update,
                { where: where }).then(result => {
                    "use strict";
                    if (result !== null && (result.length > 0) && (result[0] > 0)) {
                        return callback(null, null, 200, null, id);
                    } else {
                        return callback(1, 'Update_message_fail', 400, '', null);
                    }
                }).catch(function (error) {
                    "use strict";
                    return callback(1, 'Update_message_fail', 420, error, null);

                });
        } catch (error) {
            "use strict";
            return callback(1, 'Update_message_fail', 400, error, null);

        }
    },
    delete: function (id, callback) {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_message_id', 400, 'id of message is not a integer', null);
            }
            let where = { id: id };
            ProductDetail.destroy({ where: where }).then(result => {
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'Delete_account_fail', 420, error);
            });
        }
        catch (error) {
            return callback(1, 'Delete_account_fail', 400, error);

        }
    }

}