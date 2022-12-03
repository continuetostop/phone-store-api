const Validator = require('validator');
const Sequenlize = require('sequelize');

const Constant = require('../utils/Constant');
const Pieces = require('../utils/Pieces');

const handlerOrderDetail = require('../myfunction/handlerOrderDetail');
const handlerAllOrder = require('../myfunction/handlerAllOrder');
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
            let groupProductId;
            customerData.name = data.name;
            customerData.numberPhone = data.numberPhone;
            customerData.address = data.address;
            resultOrder = await Order.create(orderData)
            resultCustomer = await Customers.create(customerData)
            listProducts = data.listProducts;
            resultOrder.setCustomer([resultCustomer.id]);
            // let total = 0;

            var total = 0;
            await Promise.all(

                listProducts.map(async (product) => {
                    let price
                    let qty
                    let nameProduct
                    try {
                        if (typeof (product) == 'object') {
                            dataProduct = { ...product }
                            qty = dataProduct.qty

                        }
                        else {
                            dataProduct = { ...JSON.parse(product) };
                            // qty = [...qty, dataProduct.qty]
                            qty = dataProduct.qty

                        }
                        let dataOrderDetail = {}
                        let productDetailId = await dataProduct.productDetailId
                        resultProductDetail = await ProductDetail.findByPk(productDetailId);
                        price = resultProductDetail.price


                        groupProductId = await resultProductDetail.groupProductId;
                        resultGroupProduct = await GroupProduct.findByPk(groupProductId);
                        nameProduct = resultGroupProduct.name;



                        resultOrderDetail = await resultOrder.addProduct_details([productDetailId],
                            { through: { nameProduct: nameProduct, price: price, qty: qty, subtotal: price * qty } })

                    } catch (err) {
                        console.log(err);
                    }
                }))

            let orderTotal = await OrderDetail.findOne({
                attributes: [
                    [Sequenlize.fn('sum', Sequenlize.col('subtotal')), 'total'], //  need to add where:{condition1}

                ],
                where: { orderId: resultOrder.id },
                raw: false
            })



            resultOrder.total = orderTotal.dataValues.total;
            await resultOrder.save();
            await resultOrder.setStatus_orders([1]);

            return callback(null, null, 200, null, resultOrder);
        } catch (error) {
            return callback(1, 'create_Order_fail', 400, error, null);
        }
    },
    changeStatus: async (idOrder, idStatus, callback) => {
        try {
            
            try {
                resultOrder = await Order.findByPk(idOrder)
                if (resultOrder) {
                    resultOrder.addStatus_orders([idStatus])
                    return callback(null, null, 200, null, idOrder);
                } else {
                    return callback(1, 'Order_not_exist', 400, null, null);
                }

            }
            catch (error) {
                "use strict";
                return callback(1, 'Update_category_fail', 420, error, null);

            }
        } catch (error) {
            "use strict";
            return callback(1, 'Update_category_fail', 400, error, null);

        }
    },
    getOne: async (id, callback) => {
        try {
            if (!(Pieces.ValidTypeCheck(id, 'String', 0, 20) && Validator.isDecimal(id))) {
                return callback(1, 'invalid_Order_id', 400, 'id of order is not a integer', null);
            }
            let where = { id: id };
            let resultOrder;
            let resOrder={};
            try {
                resultOrder = await Order.findOne({
                    where: where,
                    include: [{
                        model: ProductDetail,
                        include: [Option, GroupProduct]
                    }, {
                        model: Customers
                    }, {
                        model: StatusOrder,
                    }]
                })
                resOrder = handlerOrderDetail(resultOrder)
                
                let next = await StatusOrder.findByPk(resOrder.idStatusOrdersNext)
                if(next&&resOrder.idStatusOrdersNext!==0){
                    resOrder.idStatusOrdersNext= next.id;
                    resOrder.statusOrdersNext= next.orderStatusName;
                }
                else{
                    resOrder.idStatusOrdersNext= null;
                    resOrder.statusOrdersNext=null;
                }

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
            whereCus={}
            if (Pieces.ValidTypeCheck(query.numberphone, 'String')) {
                whereCus.numberPhone = { [Sequenlize.Op.substring]: query.numberphone };
            }
            let where = {};
            let resOrder = {};
            try {
                resultOrders = await Order.findAndCountAll({
                    where: where,
                    include:[ {
                        model: Customers,
                        attributes: ['name', 'numberPhone', 'address'],
                        where:whereCus
                    },{
                        model: StatusOrder,
                        attributes: ['orderStatusName', 'createdAt', ]

                    },]
                })
                resOrder= handlerAllOrder(resultOrders.rows)
            } catch (error) {
                return callback(1, 'Find_and_get_all_order_fail', 420, error, null);
            }
            return callback(null, null, 200, null, resOrder);
        } catch (error) {
            return callback(1, 'Get_all_order_fail', 400, error, null);
        }
    }

}