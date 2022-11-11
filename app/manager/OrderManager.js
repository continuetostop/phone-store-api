const Validator = require('validator');
const Sequenlize = require('sequelize');

const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const handlerOrderDetail = require('../myfunction/handlerOrderDetail');
const Order = require('../models/Order.model');
const OrderDetail = require('../models/OrderDetail.model');
const Customers = require('../models/Customers.model');
const StatusOrder = require('../models/StatusOrder.model');
const ProductDetail = require('../models/ProductDetail.model');
const GroupProduct = require('../models/GroupProduct.model');
const Option = require('../models/Option.model');

module.exports = {
    create: async (data, callback) => {
        try {

            if (!Pieces.ValidTypeCheck(data.name, 'String')) {
                return callback(1, 'invalid_customer_name', 400, 'customer name is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.numberPhone, 'String')) {
                return callback(1, 'invalid_numer_phone', 400, 'number phone is not a string', null);
            }
            if (!Pieces.ValidTypeCheck(data.address, 'String')) {
                return callback(1, 'invalid_adress', 400, 'address is not a string', null);
            }
            let orderData = {};
            let customerData = {};
            let resultOrder;
            let resultGroupProduct;
            let resultCustomer;
            let resultProductDetail;
            let resultOrderDetail;
            customerData.name = data.name;
            customerData.numberPhone = data.numberPhone;
            customerData.address = data.address;
            resultOrder = await Order.create(orderData)
            resultCustomer = await Customers.create(customerData)
            listProducts = data.listProducts;
            resultOrder.setCustomer([resultCustomer.id]);
            let total = 0;
            console.log(listProducts);
            await Promise.all(

                listProducts.map(async (product) => {
                    try {

                        let dataProduct = await JSON.parse(product);
                        let dataOrderDetail = {}
                        let productDetailId = await dataProduct.productDetailId
                        resultProductDetail = await ProductDetail.findByPk(dataProduct.productDetailId);
                        resultGroupProduct = await GroupProduct.findByPk(resultProductDetail.groupProductId);
                        dataOrderDetail.nameProduct = await resultGroupProduct.name;
                        dataOrderDetail.price = await resultProductDetail.price;
                        dataOrderDetail.qty = await dataProduct.qty;
                        total = await total + dataOrderDetail.price * dataOrderDetail.qty;
                        resultOrderDetail = await resultOrder.addProduct_details([productDetailId],
                            { through: { nameProduct: dataOrderDetail.nameProduct, price: dataOrderDetail.price, qty: dataOrderDetail.qty } })
                    } catch (err) {
                        console.log(err);
                    }
                }))

            resultOrder.total = total;
            await resultOrder.save();
            await resultOrder.setStatus_orders([1]);
            return callback(null, null, 200, null, resultOrder);
        } catch (error) {
            return callback(1, 'create_Order_fail', 400, error, null);
        }
    },
    getOne: async (id, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'invalid_Order_id', 400, 'id of order is not a integer', null);
            }
            let where = { id: id };
            let resultOrder;
            let resOrder;
            try {
                resultOrder = await Order.findOne({
                    where: where,
                    include: [{
                        model: ProductDetail,
                        include: [Option, GroupProduct]
                    }, {
                        model: Customers
                    }]
                })
                resOrder= await handlerOrderDetail(resultOrder)
                return callback(null, null, 200, null, resOrder);
            } catch (error) {
                return callback(1, 'invail_order', 403, error, null);
            }

        } catch (error) {
            return callback(1, 'invail_order', 400, error, null);
        }
    },
    getAll: async (query, callback) => {
        try {
            let resultOrders;
            if (Pieces.ValidTypeCheck(query.q, 'String')) {
                where.name = { [Sequenlize.Op.like]: query.q };
            }
            let where = {};
            let resOrder={};
            try {
                resultOrders = await Order.findAndCountAll({
                    where: where,
                    include:{
                        model: Customers,
                        attributes:['name','numberPhone','address']
                    }
                })
                
            } catch (error) {
                return callback(1, 'Find_and_get_all_order_fail', 420, error, null);
            }
            return callback(null, null, 200, null, resultOrders);
        } catch (error) {
            return callback(1, 'Get_all_order_fail', 400, error, null);
        }
    }

}