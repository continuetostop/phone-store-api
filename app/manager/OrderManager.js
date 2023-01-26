const Validator = require("validator");
const Sequenlize = require("sequelize");
const Pieces = require("../utils/Pieces");

const handlerOrderDetail = require("../myfunction/handlerOrderDetail");
const handlerAllOrder = require("../myfunction/handlerAllOrder");
const Order = require("../models/Order.model");
const OrderDetail = require("../models/OrderDetail.model");
const Customers = require("../models/Customers.model");
const StatusOrder = require("../models/StatusOrder.model");
const ProductDetail = require("../models/ProductDetail.model");
const GroupProduct = require("../models/GroupProduct.model");
const Option = require("../models/Option.model");

module.exports = {
    create: async (data, callback) => {
        try {
            if (!Pieces.ValidTypeCheck(data.name, "String")) {
                return callback(1, "Name customer is not string.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.numberPhone, "String")) {
                return callback(1, "Number phone is not string.", null, 400);
            }
            if (!Pieces.ValidTypeCheck(data.address, "String")) {
                return callback(1, "Address is not string.", null, 400);
            }

            let orderData = {};
            // let customerData = {};
            let resultOrder;
            let resultGroupProduct;
            let resultCustomer;
            let resultProductDetail;
            let resultOrderDetail;
            let groupProductId;
            let { name, numberPhone, address } = data;
            customerData = { name, numberPhone, address };
            orderData.total = 0;
            if (
                Pieces.ValidTypeCheck(data.note, "String") &&
                data.note !== ""
            ) {
                orderData.note = data.note;
            }
            orderData.StatusCurrent = "spendding";

            try {
                resultOrder = await Order.create(orderData);
            } catch (error) {
                return callback(1, "Create order is unsuccessful.", null, 400);
            }
            try {
                resultCustomer = await Customers.create(customerData);
            } catch (error) {
                return callback(1, "Create order is unsuccessful.", null, 400);
            }

            listProducts = data.listProducts;
            resultOrder.setCustomer([resultCustomer.id]);
            // let total = 0;

            await Promise.all(
                listProducts.map(async (product) => {
                    let price;
                    let qty;
                    let nameProduct;
                    try {
                        if (typeof product == "object") {
                            dataProduct = { ...product };
                            qty = dataProduct.qty;
                        } else {
                            dataProduct = { ...JSON.parse(product) };
                            qty = dataProduct.qty;
                        }
                        let productDetailId = await dataProduct.productDetailId;
                        resultProductDetail = await ProductDetail.findByPk(
                            productDetailId
                        );
                        price = resultProductDetail.price;

                        groupProductId =
                            await resultProductDetail.groupProductId;
                        resultGroupProduct = await GroupProduct.findByPk(
                            groupProductId
                        );
                        nameProduct = resultGroupProduct.name;

                        resultOrderDetail =
                            await resultOrder.addProduct_details(
                                [productDetailId],
                                {
                                    through: {
                                        nameProduct: nameProduct,
                                        price: price,
                                        qty: qty,
                                        subtotal: price * qty,
                                    },
                                }
                            );
                    } catch (err) {
                        console.log(err);
                    }
                })
            );

            let orderTotal = await OrderDetail.findOne({
                attributes: [
                    [Sequenlize.fn("sum", Sequenlize.col("subtotal")), "total"], //  need to add where:{condition1}
                ],
                where: { orderId: resultOrder.id },
                raw: false,
            });

            resultOrder.total = orderTotal.dataValues.total;
            await resultOrder.save();
            await resultOrder.setStatus_orders([1]);
            return callback(0, "Create order is successful.", resultOrder, 201);
        } catch (error) {
            return callback(1, "Create order is unsuccessful.", null, 400);
        }
    },
    changeStatus: async (idOrder, idStatus, callback) => {
        try {
            try {
                resultOrder = await Order.findByPk(idOrder);

                if (resultOrder) {
                    try {
                        resultOrder.addStatus_orders([idStatus]);
                        resultStatusOrder = await StatusOrder.findByPk(
                            idStatus
                        );
                        resultOrder.StatusCurrent =
                            resultStatusOrder.orderStatusName;
                        resultOrder.save();
                        return callback(
                            0,
                            "Update status order is successful.",
                            resultOrder,
                            200
                        );
                    } catch (error) {
                        return callback(
                            1,
                            "Update status order is unsuccessful.",
                            resultOrder,
                            400
                        );
                    }
                } else {
                    return callback(1, "Order is not exist.", null, 404);
                }
            } catch (error) {
                return callback(
                    1,
                    "Update status order is unsuccessful.",
                    null,
                    400
                );
            }
        } catch (error) {
            return callback(
                1,
                "Update status order is unsuccessful.",
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
                return callback(1, "Id of order is not a interger.", null, 400);
            }
            let where = { id: id };
            let resultOrder;
            let resOrder = {};
            try {
                resultOrder = await Order.findOne({
                    where: where,
                    include: [
                        {
                            model: ProductDetail,
                            include: [Option, GroupProduct],
                        },
                        {
                            model: Customers,
                        },
                        {
                            model: StatusOrder,
                        },
                    ],
                });
                resOrder = handlerOrderDetail(resultOrder);

                let next = await StatusOrder.findByPk(
                    resOrder.idStatusOrdersNext
                );
                if (next && resOrder.idStatusOrdersNext !== 1) {
                    resOrder.idStatusOrdersNext = next.id;
                    resOrder.statusOrdersNext = next.orderStatusName;
                } else {
                    resOrder.idStatusOrdersNext = null;
                    resOrder.statusOrdersNext = null;
                }
                return callback(1, "Get order is successful.", resOrder, 200);
            } catch (error) {
                return callback(1, "Get order is unsuccessful.", null, 400);
            }
        } catch (error) {
            return callback(1, "Get order is unsuccessful.", null, 400);
        }
    },
    getAll: async (query, callback) => {
        try {
            let resultOrders;
            let whereCus = {};
            let whereOrder = {};
            let resOrder = {};

            if (Pieces.ValidTypeCheck(query.numberphone, "String")) {
                whereCus.numberPhone = {
                    [Sequenlize.Op.startsWith]: query.numberphone,
                };
            }
            if (Pieces.ValidTypeCheck(query.status, "String")) {
                whereOrder.StatusCurrent = {
                    [Sequenlize.Op.substring]: query.status,
                };
            }
            try {
                resultOrders = await Order.findAndCountAll({
                    where: whereOrder,
                    include: [
                        {
                            model: Customers,
                            attributes: ["name", "numberPhone", "address"],
                            where: whereCus,
                        },
                        {
                            model: StatusOrder,
                            attributes: ["orderStatusName", "createdAt"],
                        },
                    ],
                });
                resOrder = handlerAllOrder(resultOrders.rows);
            } catch (error) {
                return callback(
                    1,
                    "Find or get all order is unsuccessful.",
                    null,
                    400
                );
            }
            return callback(
                0,
                "Find or get all order is successful.",
                resOrder,
                200
            );
        } catch (error) {
            return callback(
                1,
                "Find or get all order is unsuccessful.",
                null,
                400
            );
        }
    },
};
