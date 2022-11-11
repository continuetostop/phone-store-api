const OrderCtrl= require('../controllers/OrderCtrl');

module.exports=function (app){
    app.post('/v1/order',OrderCtrl.create);
    app.get('/v1/order/:id',OrderCtrl.getOne);
    app.get('/v1/orders', [authJwt.verifyToken, authJwt.isAdmin],OrderCtrl.getAll);
    app.put('/v1/order/:id',OrderCtrl.update);
    app.delete('/v1/order/:id',OrderCtrl.delete);
}