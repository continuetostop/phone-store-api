const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const GroupProduct = require('../models/GroupProduct.model');
const ProductDetail = require('../models/ProductDetail.model');
const Option = require('../models/Option.model');
const ProductDetailOption = require('../models/ProductDetailOption.model');
const Category = require('../models/Category.model');

const handerProductDetail = require('../myfunction/handlerProductDetail')

module.exports = {
    create: async (data, options, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.categoryId, 'String', 0, 20) || !Validator.isDecimal(data.categoryId)) {
                return callback(1, 'invalid_category_id', 400, 'category id is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_group_product_name', 400, 'group product name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.price, 'String', 0, 20) || !Validator.isDecimal(data.price)) {
                return callback(1, 'invalid_group_product_price', 400, 'group product price is not a interger', null);
            }
            if (!Pieces.ValidTypeCheck(data.image, 'String')) {
                return callback(1, 'invalid_product_image', 400, 'product image is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.description, 'String')) {
                return callback(1, 'invalid_group_product_description', 400, 'group product description is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.specific, 'String')) {
                return callback(1, 'invalid_group_product_specific', 400, 'group product specific is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.services, 'String')) {
                return callback(1, 'invalid_group_product_services', 400, 'group product services is not a string', null);
            }

            let groupProductData = {};
            let productDataDetail = {};
            groupProductData.name = data.name;
            productDataDetail.price = data.price;
            productDataDetail.image = data.image;
            groupProductData.description = data.description;
            groupProductData.specific = data.specific;
            groupProductData.services = data.services;
            // groupProductData.option = data.option;
            //console.log(groupProductData);
            let resultGroupProduct
            let resultProductDetail;
            let resultCategory;
            let resultProductDetailValue;
            let resultOption;
            let arrValueOption = [];
            let valueOption;
            let arraOptionId = [];
            let groupProductId;
            let result;
            // let resultOption;
            resultGroupProduct = await GroupProduct.create(groupProductData)

            resultProductDetail = await ProductDetail.create(productDataDetail)

            resultGroupProduct.addProduct_details([resultProductDetail.id])

            groupProductId = resultGroupProduct.id;
            resultCategory = await Category.findByPk(data.categoryId)
            resultCategory.addGroup_products([groupProductId]);
            Promise.all(
                options.map(async (option) => {
                    try {

                        let dataOption = await JSON.parse(option);
                        let dataOptionClone = await { ...dataOption }
                        delete dataOption.value
                        resultOption = await Option.create(dataOption);
                        result = resultGroupProduct.addOptions([resultOption.id])
                        resultProductDetail.addOptions([resultOption.id], { through: { value: dataOptionClone.value } })
                        resultProductDetailValue = await resultGroupProduct.addOptions([result.optionId])

                    } catch (err) {
                        console.log(err);
                    }
                }))
            return callback(null, null, 200, null, resultGroupProduct);
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
    getByCategory: (id, query,callback) => {
        try {
            let where = { categoryId: id };

            let page = 1;
            let perPage = Constant.DEFAULT_PAGING_SIZE;


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
                include: ProductDetail,
                limit: perPage,
                offset: offset
            })
                .then((data) => {
                    let pages = Math.ceil(data.count / perPage);
                    let groupProducts = [];
                    Promise.all(
                        data.rows.map((i) => {
                            let groupProduct = {}
                            i.price = i.product_details[0].price
                            groupProduct.id = i.id;
                            groupProduct.name = i.name;
                            groupProduct.price = i.product_details[0].price
                            groupProduct.image = i.product_details[0].image
                            delete i.product_details;
                            groupProducts.push(groupProduct)
                        })
                    )
                    let output = {
                        data: groupProducts,
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
                include: ProductDetail,
                limit: perPage,
                offset: offset
            })
                .then((data) => {
                    let pages = Math.ceil(data.count / perPage);
                    let groupProducts = [];
                    Promise.all(
                        data.rows.map((i) => {
                            let groupProduct = {}
                            i.price = i.product_details[0].price
                            groupProduct.id = i.id;
                            groupProduct.name = i.name;
                            groupProduct.price = i.product_details[0].price
                            groupProduct.image = i.product_details[0].image
                            delete i.product_details;
                            groupProducts.push(groupProduct)
                        })
                    )
                    let output = {
                        data: groupProducts,
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
            if (Pieces.ValidTypeCheck(data.specific, 'String')) {
                update.specific = data.specific;
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