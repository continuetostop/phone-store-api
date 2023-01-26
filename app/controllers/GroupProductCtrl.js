const GroupProductManager = require("../manager/GroupProductManager");
const Rest = require("../utils/Restware");

module.exports = {
    create: (req, res) => {
        let data = req.body || "";
        let options = null;
        if (!(data === "" || Object.keys(data).length === 0)) {
            options = data.option;
            delete data.option;
        }
        GroupProductManager.create(
            data,
            options,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },

    getOne: (req, res) => {
        let id = req.params.id;

        GroupProductManager.getOne(id, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    getByCategory: (req, res) => {
        let id = req.params.categoryId;
        let query = req.query || "";

        GroupProductManager.getByCategory(
            id,
            query,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },

    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || "";
        GroupProductManager.getAll(
            query,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    update: (req, res) => {
        let id = req.params.id;
        let data = req.body || "";
        let options = null;
        if (!(data === "" || Object.keys(data).length === 0)) {
            options = data.option;
            delete data.option;
        }
        GroupProductManager.update(
            id,
            data,
            options,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    delete: (req, res) => {
        let id = req.params.id;
        GroupProductManager.delete(id, (errorCode, message, data, httpCode) => {
            let resData = {};
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    getOptionByGroupProduct: (req, res) => {
        let groupProductId = req.params.groupProductId;

        GroupProductManager.getOptionByGroupProduct(
            groupProductId,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
};
