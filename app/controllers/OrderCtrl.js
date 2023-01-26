const OrderManager = require("../manager/OrderManager");
const Rest = require("../utils/Restware");

module.exports = {
    create: (req, res) => {
        let data = req.body || "";
        OrderManager.create(data, (errorCode, message, data, httpCode) => {
            if (errorCode) {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },

    getOne: (req, res) => {
        let id = req.params.id;

        OrderManager.getOne(id, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || "";
        OrderManager.getAll(query, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    changeStatus: (req, res) => {
        let idOrder = req.params.idOrder;
        let idStatus = req.params.idStatus;
        OrderManager.changeStatus(
            idOrder,
            idStatus,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    delete: (req, res) => {
        let id = req.params.id;
        OrderManager.delete(id, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
};
