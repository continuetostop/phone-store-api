const ProductDetailCtrl= require('../controllers/ProductDetailCtrl');

module.exports=function (app){
    app.post('/v1/groupproduct/:groupproductid/productdetail', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.create);
    app.get('/v1/groupproduct/:groupproductid/productdetail:id',ProductDetailCtrl.getOne);
    app.get('/v1/groupproducts',ProductDetailCtrl.getAll);
    app.put('/v1/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.update);
    app.delete('/v1/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.delete);
}