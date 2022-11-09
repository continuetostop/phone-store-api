const AuthManager = require('../manager/AuthManager');
const Rest = require('../utils/Restware');

module.exports = {
    signup: (req, res) => {
        let data = req.body || '';
        AuthManager.create(data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};

            resData.id = result.id;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },
    signin: (req, res) => {
        let data = req.body || '';
        AuthManager.signin(data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            req.session.token = result;
            resData=result;
            return Rest.sendSuccessOne(res, resData, httpCode);
        })
    },
    signout: (req, res) => {
        let data = req.body || '';
        AuthManager.signout( data, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            let resData = {};
            resData.result = result;
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },
}