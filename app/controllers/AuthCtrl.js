const AuthManager = require("../manager/AuthManager");
const Rest = require("../utils/Restware");

module.exports = {
    signup: (req, res) => {
        let data = req.body || "";
        AuthManager.create(data, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    signin: (req, res) => {
        let data = req.body || "";
        AuthManager.signin(data, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    token: (req, res) => {
        let data = req.body || "";
        AuthManager.token(data, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
    signout: (req, res) => {
        let data = req.body || "";
        AuthManager.signout(data, (errorCode, message, data, httpCode) => {
            return Rest.sendData(res, errorCode, message, data, httpCode);
        });
    },
};
