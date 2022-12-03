const OrderManager = require('../manager/OrderManager');
const Rest = require('../utils/Restware');

module.exports = {
    create: (req, res) => {
        let data = req.body || '';
        OrderManager.create(data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};

            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },

    getOne: (req, res) => {
        let id = req.params.id;

        OrderManager.getOne(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || '';
        OrderManager.getAll(query, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessMany(res, result, httpCode);
        })
    },
    changeStatus: (req, res) => {
        let idOrder = req.params.idOrder;
        let idStatus = req.params.idStatus;
        OrderManager.changeStatus(idOrder, idStatus, (errorCode, errorMessage, httpCode, errorDescription, result) => {
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
        OrderManager.delete(id, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.id = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    }

}