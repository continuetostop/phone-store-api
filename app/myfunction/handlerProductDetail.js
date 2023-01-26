const handerProductDetail = (data) => {
    let { id, name, image, description, specific, services } = data;
    let groupProductData = { id, name, image, description, specific, services };
    groupProductData.product_details = [];
    groupProductData.options = [];
    // if (!data.product_details[0]) return null;
    if (data.product_details.length === 0) return null;

    data.product_details[0].options.map((k, index) => {
        let option = {};
        option.key = k.name;
        option.value = [];
        groupProductData.options.push(option);
    });
    data.product_details.map((product_detail) => {
        let data = {};
        let { id, image } = product_detail;
        data = { id, image };
        data.price = +product_detail.price;
        product_detail.options.map((j, index) => {
            data[j.name] = j.product_detail_option.value + " " + j.unit;
            if (
                !groupProductData.options[index].value.includes(
                    j.product_detail_option.value + " " + j.unit
                )
            )
                groupProductData.options[index].value.push(
                    j.product_detail_option.value + " " + j.unit
                );
        });
        groupProductData.product_details.push(data);
    });
    return groupProductData;
};

module.exports = handerProductDetail;
