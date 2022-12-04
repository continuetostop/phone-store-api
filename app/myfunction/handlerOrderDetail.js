const StatusOrder = require('../models/StatusOrder.model');
const ProductDetail = require('../models/ProductDetail.model');

const handerOrderDetail = (data) => {
    

    let orderDetailData = {}
    orderDetailData.id = data.id;
    orderDetailData.customerId = data.customer.id;
    orderDetailData.customerName = data.customer.name;
    orderDetailData.customerNumberPhone = data.customer.numberPhone;
    orderDetailData.customerAdress = data.customer.address;
    orderDetailData.statusOrdersCurrent = data.StatusCurrent
    // orderDetailData.idStatusOrdersNext = data.status_orders[0].orderStatusName==='cancel'? 0:data.status_orders[data.status_orders.length-1].id+1;
    orderDetailData.idStatusOrdersNext=data.status_orders.find(item=> item.orderStatusName===data.StatusCurrent).id +1
    orderDetailData.statusOrdersNext ='';
    orderDetailData.createdAt = data.createdAt;
    orderDetailData.updatedAt = data.updatedAt;
    orderDetailData.updatedAt =data.status_orders.find(item=> item.orderStatusName===data.StatusCurrent).order_status_order.updatedAt;;
    orderDetailData.total = data.total;
    orderDetailData.listProducts = []

    data.product_details.map((i) => {
        let data = {}
        data.id = i.id;
        data.ProductName = i.group_product.name;
        data.price = i.order_detail.price;
        data.qty = i.order_detail.qty;
        data.subtotal = i.order_detail.subtotal;
        data.image = i.image;
        data.options = []
        //console.log(i)

        i.options.map((j) => {
            optionData = {}
            optionData[j.name] = j.product_detail_option.value+" "+ j.unit

            data.options.push(optionData);
        })
        orderDetailData.listProducts.push(data)
    })
    return orderDetailData;
}

module.exports = handerOrderDetail;