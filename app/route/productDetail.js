const ProductDetailCtrl= require('../controllers/ProductDetailCtrl');
const authJwt =require('../middlewares/authJwt')

module.exports=function (app){
    app.post('/api/v1/auth/admin/groupproduct/:groupproductid/productdetail', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.create);
    app.get('/api/v1/productdetail/:id',ProductDetailCtrl.getOne);
    app.put('/api/v1/auth/admin/productdetail/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.update);
    app.delete('/api/v1/auth/admin/productdetail/:id', [authJwt.verifyToken, authJwt.isAdmin],ProductDetailCtrl.delete);
}