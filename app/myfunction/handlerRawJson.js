const handlerRawJson = (datas) => {
    if (!datas) return null;

    return datas.map((data) => {
        if (typeof data == "object") {
            return data;
        } else {
            return JSON.parse(data);
        }
    });
};
module.exports = handlerRawJson;
