const ProductDetailCtrl= require('../controllers/ProductDetailCtrl');
const authJwt =require('../middlewares/authJwt')

module.exports=function (app){
    app.post('/v1/admin/groupproduct/:groupproductid/productdetail', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.create);
    app.get('/v1/groupproduct/:groupproductid/productdetail/:id',ProductDetailCtrl.getOne);
    app.get('/v1/groupproducts',ProductDetailCtrl.getAll);
    app.put('/v1/admin/groupproduct/:groupproductid/productdetail/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.update);
    app.delete('/v1/admin/groupproduct/:groupproductid/productdetail/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.delete);
}