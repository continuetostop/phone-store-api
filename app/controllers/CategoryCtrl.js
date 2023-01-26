const CategoryManager = require("../manager/CategoryManager");
const Rest = require("../utils/Restware");

module.exports = {
    create: (req, res) => {
        let data = req.body || "";
        CategoryManager.create(data, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },

    getOne: (req, res) => {
        let id = req.params.id;

        CategoryManager.getOne(id, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    getAll: (req, res) => {
        //let query = req.params || '';
        let query = req.query || "";
        CategoryManager.getAll(query, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    update: (req, res) => {
        let id = req.params.id;
        let data = req.body || "";
        CategoryManager.update(
            id,
            data,
            (errorCode, message, data, httpCode) => {
                return Rest.sendData(res, errorCode, message, data, httpCode);
            }
        );
    },
    delete: (req, res) => {
        let id = req.params.id;
        CategoryManager.delete(id, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
};
