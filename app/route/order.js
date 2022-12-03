const OrderCtrl = require('../controllers/OrderCtrl');
const authJwt = require('../middlewares/authJwt')
module.exports = function (app) {
    app.post('/api/v1/order', OrderCtrl.create);
    app.get('/api/v1/auth/admin/order/:id',[authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.getOne);
    app.get('/api/v1/auth/admin/orders', [authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.getAll);
    app.put('/api/v1/auth/admin/order/:idOrder/status/:idStatus',  [authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.changeStatus);
    app.delete('/api/v1/auth/admin/order/:id', [authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.delete);
}