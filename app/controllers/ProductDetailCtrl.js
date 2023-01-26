const ProductDetailManager = require("../manager/ProductDetailManager");
const Rest = require("../utils/Restware");

module.exports = {
    create: (req, res) => {
        let data = req.body || "";
        let groupProductId = req.params.groupproductid;
        // console.log(data);
        let options = null;
        if (!(data === "" || Object.keys(data).length === 0)) {
            options = data.option;
            delete data.option;
        }
        ProductDetailManager.create(
            groupProductId,
            data,
            options,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },

    getOne: (req, res) => {
        let id = req.params.id;

        ProductDetailManager.getOne(
            id,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    update: (req, res) => {
        let productDetailId = req.params.id;
        let data = req.body || "";
        ProductDetailManager.update(
            productDetailId,
            data,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    delete: (req, res) => {
        let id = req.params.id;
        ProductDetailManager.delete(
            id,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
};
