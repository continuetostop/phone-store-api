
const handlerAllOrder = (data) => {


    let allOrderDetailData =[]
    data.forEach((OrderDetailData)=>{
        let newOrderDetailData={}
        newOrderDetailData.id=OrderDetailData.id
        newOrderDetailData.name=OrderDetailData.customer.name
        newOrderDetailData.total=OrderDetailData.total
        newOrderDetailData.numberPhone=OrderDetailData.customer.numberPhone
        newOrderDetailData.address=OrderDetailData.customer.address
        newOrderDetailData.status_orders=OrderDetailData.StatusCurrent
        newOrderDetailData.updatedAt=OrderDetailData.status_orders.find(item=> item.orderStatusName===OrderDetailData.StatusCurrent).order_status_order.updatedAt;
  
        newOrderDetailData.createdAt=OrderDetailData.createdAt
        allOrderDetailData =[...allOrderDetailData, {...newOrderDetailData}]
    })
    return allOrderDetailData;
}

module.exports = handlerAllOrder;