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
            try{
                req.session.token = result.token;
                resData = result;
                return Rest.sendSuccessOne(res, resData, httpCode);
            }catch(err){
                console.log(err);
            }
        })
    },
    signout: (req, res) => {
        try {
            req.session = null;
            return Rest.sendSuccessOne(res, 'You\'ve been signed out!', 403 )
    } catch (error) {
            return Rest.sendError(res,1, 'logout_unsuccessful', 400, error, null);
        }
        // if (errorCode) {
        //     return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
        // }
        // let resData = {};
        // resData.result = result;
        // return Rest.sendSuccessOne(res, result, httpCode);

    },
}