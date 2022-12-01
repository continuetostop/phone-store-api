const ProductDetailManager = require('../manager/ProductDetailManager');
const Rest = require('../utils/Restware');

module.exports = {
    create: (req, res) => {
        let data = req.body || '';
        let groupProductId = req.params.groupproductid;
        // console.log(data);
        let options = null;
        let resultProductDetail
        if (!(data === '' || Object.keys(data).length === 0)) {
            options = data.option;
            delete data.option;
        }
        ProductDetailManager.create(groupProductId, data, options, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            //console.log(result);
            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },

    getOne: (req, res) => {
        let id = {};
        id.id = req.params.id;
        id.groupproductid = req.params.groupproductid;

        ProductDetailManager.getOne(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || '';
        ProductDetailManager.getAll(query, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessMany(res, result, httpCode);
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        let data = req.body || '';
        ProductDetailManager.update(id, data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    delete: (req, res) => {
        let id = req.params.id;
        ProductDetailManager.delete(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    }

}