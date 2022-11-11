const handerProductDetail = (data) => {
    let groupProductData = {}
    groupProductData.id = data.id;
    groupProductData.name = data.name;
    groupProductData.price = data.price;
    groupProductData.image = data.image;
    groupProductData.product_details = []
    data.product_details.map((i) => {
        let data = {}
        data.id = i.id;
        // data.name = i.name;
        data.price = i.price;
        data.image = i.image;
        // data.description = i.description;
        data.options = []
        //console.log(i)
        i.options.map((j) => {
            let dataOptions={};
            dataOptions.key = j.name;
            dataOptions.unit = j.unit;
            dataOptions.value = j.product_detail_option.value;
            data.options.push(dataOptions)
        })
        groupProductData.product_details.push(data)
    })
    return groupProductData;
}

module.exports=handerProductDetail;