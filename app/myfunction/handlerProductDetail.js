const handerProductDetail = (data) => {
    let groupProductData = {}
    groupProductData.id = data.id;
    groupProductData.name = data.name;
    groupProductData.price = data.price;
    groupProductData.image = data.image;
    groupProductData.product_details = []
    groupProductData.options = []

    data.product_details[0].options.map((k, index) => {
        let option = {};
        option.key = k.name;
        option.value = [];
        groupProductData.options.push(option)
    }
    )
    data.product_details.map((i) => {
        let data = {}
        data.id = i.id;
        // data.name = i.name;
        data.price = parseInt(i.price);
        data.image = i.image;
        // data.description = i.description;
        //data.options = []
        i.options.map((j, index) => {
           // let dataOptions = {};
            data[j.name] = j.product_detail_option.value + " " + j.unit;
            //dataOptions[j.name] = j.product_detail_option.value + " " + j.unit;
            if (!groupProductData.options[index].value.includes(j.product_detail_option.value + " " + j.unit))
                groupProductData.options[index].value.push(j.product_detail_option.value + " " + j.unit);
            //data.options.push(dataOptions)
        })
        groupProductData.product_details.push(data)
    })
    return groupProductData;
}

module.exports = handerProductDetail;