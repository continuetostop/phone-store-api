const OptionManager = require('../manager/OptionManager');
const Rest = require('../utils/Restware');

module.exports = {
    create: (req, res) => {
        let data = req.body || '';
        let groupProductId = req.params.groupProductId;
        OptionManager.create(groupProductId,data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};

            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },

    getOptionByGroupProduct: (req, res) => {
        let groupProductId = req.params.groupProductId;

        OptionManager.getOptionByGroupProduct(groupProductId, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        let groupProductId = req.params.groupProductId;
        let data = req.body || '';
        OptionManager.update(groupProductId,id, data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
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
        let groupProductId = req.params.groupProductId;
        OptionManager.delete(groupProductId,id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    }

}