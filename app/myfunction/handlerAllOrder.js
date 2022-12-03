
const handlerAllOrder = (data) => {


    let allOrderDetailData =[]
    data.forEach((OrderDetailData)=>{
        let newOrderDetailData={}
        newOrderDetailData.id=OrderDetailData.id
        newOrderDetailData.name=OrderDetailData.customer.name
        newOrderDetailData.total=OrderDetailData.total
        newOrderDetailData.numberPhone=OrderDetailData.customer.numberPhone
        newOrderDetailData.address=OrderDetailData.customer.address
        newOrderDetailData.status_orders=OrderDetailData.status_orders[0].orderStatusName==='cancel'? 'cancel':OrderDetailData.status_orders[OrderDetailData.status_orders.length-1].orderStatusName
        newOrderDetailData.updatedAt=OrderDetailData.status_orders[OrderDetailData.status_orders.length-1]
        .order_status_order.updatedAt;
        newOrderDetailData.createdAt=OrderDetailData.createdAt
        allOrderDetailData =[...allOrderDetailData, {...newOrderDetailData}]
    })
    return allOrderDetailData;
}

module.exports = handlerAllOrder;