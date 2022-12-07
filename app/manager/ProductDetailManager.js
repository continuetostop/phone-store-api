const Validator = require('validator');
const Sequenlize = require('sequelize');


const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const ProductDetail = require('../models/ProductDetail.model');
const GroupProduct = require('../models/GroupProduct.model');
const Option = require('../models/Option.model');

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
            let listOption = {};
            resultGroupProduct = await GroupProduct.findByPk(groupProductId)
            resultProductDetail = await ProductDetail.create(productDetalData);
            let where = { groupProductId: groupProductId };
            // try{
            //     listOption = await Option.findAll({
            //         where: where,
            //         attributes: ['id', 'name', 'unit']
            //     })

            // }catch(err){
            //     console.log(err)
            // }
            // console.log(listOption)

            resultGroupProduct.addProduct_details([resultProductDetail.id]);
            options.map(async (option) => {
                try {
                    let dataOption;
                    // let dataOption = await JSON.parse(option);
                    if (typeof (option) == 'object') {
                        dataOption = option
                    }
                    else {
                        dataOption = await JSON.parse(option);
                    }
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

            if (!Pieces.ValidTypeCheck(id, 'String', 0, 20) || !Validator.isDecimal(id)) {
                return callback(1, 'invalid_product_detail_id', 400, 'product detail id is not a interger', null);
            }
            let where = { id: id };
            let resultProductDetail
            
            try {
                resultProductDetail = await ProductDetail.findOne({
                    where: where,
                    include:GroupProduct
                    // attributes: attributes
                })
                return callback(null, null, 200, null, resultProductDetail);
            }
            catch (error) {
                return callback(1, 'invail_message', 403, error, null);
            };

        } catch (error) {
            return callback(1, 'invail_message', 400, error, null);
        }
    },
    update: async (productDetailId, data, callback) => {
        try {
            let update = {};
            let where = {};
            let resultProductDetail;

            if (!(Pieces.ValidTypeCheck(productDetailId, 'String', 0, 20) && Validator.isDecimal(productDetailId))) {
                return callback(1, 'Invalid_product_detail_id', 400, 'id of product detail is not a integer', null);
            }
            if (Pieces.ValidTypeCheck(data.price, 'String')&&Validator.isDecimal(data.price)) {
                update.price = data.price;
            }
            if (Pieces.ValidTypeCheck(data.image, 'String')) {
                update.image = data.image;
            }
            where.id = productDetailId;



            try {
                resultProductDetail = await ProductDetail.update(update,
                    { where: where })
                "use strict";
                if (resultProductDetail !== null && (resultProductDetail.length > 0) && (resultProductDetail[0] > 0)) {
                    return callback(null, null, 200, null, resultProductDetail);
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

            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'Invalid_product_detail_id', 400, 'id of product detail is not a integer', null);
            }
            let where = { id: id };
            try {
                resultProductDetail = await ProductDetail.destroy({ where: where })
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