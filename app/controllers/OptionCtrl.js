const OptionManager = require('../manager/OptionManager');
const Rest = require('../utils/Restware');

module.exports = {

    getOptionByGroupProduct: (req, res) => {
        let groupProductId = req.params.groupProductId;

        OptionManager.getOptionByGroupProduct(groupProductId, (errorCode, errorMessage, httpCode, errorDescription, result) => {
            if (errorCode) {
                return Rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
            }
            return Rest.sendSuccessOne(res, result, httpCode);
        })
    },

}