const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const GroupProduct = require('../models/GroupProduct.model');
const ProductDetail = require('../models/ProductDetail.model');
const Option = require('../models/Option.model');
const ProductDetailOption = require('../models/ProductDetailOption.model');

const handerProductDetail = require('../myfunction/handlerProductDetail')

module.exports = {
    create: (data, options, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_group_product_name', 400, 'group product name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.price, 'String', 0, 20) || !Validator.isDecimal(data.price)) {
                return callback(1, 'invalid_group_product_price', 400, 'group product price is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.description, 'String')) {
                return callback(1, 'invalid_group_product_description', 400, 'group product description is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.specific, 'String')) {
                return callback(1, 'invalid_group_product_specific', 400, 'group product specific is not a string', null);
            }

            let groupProductData = {};
            let productDataDetail = {};
            groupProductData.name = data.name;
            groupProductData.price = productDataDetail.price = data.price;
            groupProductData.image = productDataDetail.image = data.image;
            groupProductData.description = data.description;
            groupProductData.specific = data.specific;
            // groupProductData.option = data.option;
            //console.log(groupProductData);
            let resultGroupProduct
            let resultProductDetail;
            let resultOption;
            let arrValueOption = [];
            let valueOption;
            let arraOptionId = [];
            let groupProductId;
            GroupProduct.create(groupProductData)
                .then((result) => {
                    resultGroupProduct = result;
                    return ProductDetail.create(productDataDetail)
                })
                .then((result) => {
                    resultProductDetail = result;
                    return resultGroupProduct.addProduct_details([resultProductDetail.id])

                })
                .then((result) => {
                    groupProductId = result.id;
                    //console.log('groupProductId', groupProductId);
                    options.map((option) => {
                        try {

                            let dataOption = JSON.parse(option);
                            arrValueOption.push(dataOption.value);
                            delete dataOption.value;
                            Option.create(dataOption)
                                .then((result) => {
                                    resultGroupProduct.addOptions([result.id])
                                    return result;
                                })
                                .then((result) => {
                                    arraOptionId.push(result.id)
                                    valueOption = arrValueOption.shift();
                                    return resultProductDetail.addOptions([result.id], { through: { value: valueOption } })
                                })
                                .then((result) => {
                                    return resultGroupProduct.addOptions([result.optionId])
                                })
                                
                                .catch((err) => {
                                    console.log(err);
                                })

                        } catch (err) {
                            console.log(err);
                        }
                    })
                    return arraOptionId;
                })
                .then((arraOptionId) => {

                    return callback(null, null, 200, null, groupProductData);

                })
                .catch((err) => {
                    console.log("error", err);
                })
            // .then((result) => {
            //     GroupProduct.findByPk(groupProductId, {
            //         include: {
            //             model: ProductDetail,
            //             include: Option
            //         }
            //     }
            //     ).then((result) => {
            //         console.log('check',JSON.stringify(result))
            //         console.log('arraOptionId',arraOptionId)
            //     })
            // });

            // GroupProduct.create(groupProductData).then(result => {
            //     'use strict';
            //     return callback(null, null, 200, null, result);
            // }).catch(function (error) {
            //     return callback(1, 'create_group_product_message_fail', 420, error, null);
            // });


        } catch (error) {
            return callback(1, 'create_group_product_message_fail', 400, error, null);
        }
    },
    getOne: (id, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'invalid_group_product_id', 400, 'id of group product is not a integer', null);
            }
            let where = { id: id };

            GroupProduct.findOne({
                where: where,
                include: {
                    model: ProductDetail,
                    include: {
                        model: Option,

                    },
                },
            }).then((result) => {
                let groupProductData = {}
                groupProductData.id = result.id;
                groupProductData.name = result.name;
                groupProductData.price = result.price;
                groupProductData.image = result.image;
                //console.log(JSON.stringify(result));
                //return result;
                return handerProductDetail(result)
            }).then(result => {
                'use strict';
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'invail_group_product', 403, error, null);
            });

        } catch (error) {
            return callback(1, 'invail_group_product', 400, error, null);
        }
    },
    getAll: (query, callback) => {
        try {
            let where = {};
            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;
            if (Pieces.ValidTypeCheck(query.q, 'String')) {
                where.name = { [Sequenlize.Op.like]: query.q };
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
            GroupProduct.findAndCountAll({
                where: where,
                limit: perPage,
                offset: offset
            })
                .then((data) => {
                    let pages = Math.ceil(data.count / perPage);
                    let groupProduct = data.rows;
                    let output = {
                        data: groupProduct,
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
                    return callback(1, 'Find_and_get_all_group_product_fail', 420, error, null);
                });
        } catch (error) {
            return callback(1, 'Get_all_group_product_fail', 400, error, null);
        }
    },
    update: (id, data, callback) => {
        try {
            let update = {};
            let where = {};
            if (!(Pieces.ValidTypeCheck(id, 'String', 1, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_group_product_id', 400, 'Id of group product is not a integer', null);
            }

            where.id = id;
            if (Pieces.ValidTypeCheck(data.name, 'String')) {
                update.name = data.name;
            }
            if (Pieces.ValidTypeCheck(data.description, 'String')) {
                update.description = data.description;
            }

            GroupProduct.update(update,
                { where: where }).then(result => {
                    "use strict";
                    if (result !== null && (result.length > 0) && (result[0] > 0)) {
                        return callback(null, null, 200, null, id);
                    } else {
                        return callback(1, 'Update_group_product_fail', 400, '', null);
                    }
                }).catch(function (error) {
                    "use strict";
                    return callback(1, 'Update_group_product_fail', 420, error, null);

                });
        } catch (error) {
            "use strict";
            return callback(1, 'Update_group_product_fail', 400, error, null);

        }
    },
    delete: function (id, callback) {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_group_product_id', 400, 'id of group product is not a integer', null);
            }
            let where = { id: id };
            GroupProduct.destroy({ where: where }).then(result => {
                return callback(null, null, 200, null, result);
            }).catch(function (error) {
                return callback(1, 'Delete_group_product_fail', 420, error);
            });
        }
        catch (error) {
            return callback(1, 'Delete_group_product_fail', 400, error);

        }
    }

}