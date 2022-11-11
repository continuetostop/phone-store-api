const handerProductDetail = (data) => {

    let orderDetailData = {}
    orderDetailData.id = data.id;
    orderDetailData.customerId = data.customer.id;
    orderDetailData.customerName = data.customer.name;
    orderDetailData.customerNumberPhone = data.customer.numberPhone;
    orderDetailData.customerAdress = data.customer.address;
    orderDetailData.createdAt = data.createdAt;
    orderDetailData.updatedAt = data.updatedAt;
    orderDetailData.total = data.total;
    orderDetailData.listProducts = []

    data.product_details.map((i) => {
        let data = {}
        data.id = i.id;
        data.ProductName = i.group_product.name;
        data.price = i.price;
        data.image = i.image;
        data.description = i.description;
        data.options = []
        //console.log(i)

        i.options.map((j) => {
            optionData = {}
            optionData.key = j.name
            optionData.unit = j.unit
            optionData.value = j.product_detail_option.value
            data.options.push(optionData);
        })
        orderDetailData.listProducts.push(data)
    })
    return orderDetailData;
}

module.exports = handerProductDetail;