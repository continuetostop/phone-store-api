const OrderCtrl = require('../controllers/OrderCtrl');
const authJwt = require('../middlewares/authJwt')
module.exports = function (app) {
    app.post('/v1/order', OrderCtrl.create);
    app.get('/v1/order/:id', OrderCtrl.getOne);
    app.get('/v1/admin/orders', [authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.getAll);
    app.put('/v1/order/:id', OrderCtrl.update);
    app.delete('/v1/admin/order/:id', [authJwt.verifyToken, authJwt.isAdmin], OrderCtrl.delete);
}