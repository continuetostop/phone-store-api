const GroupProductCtrl= require('../controllers/GroupProductCtrl');
const authJwt =require('../middlewares/authJwt')

module.exports=function (app){
    app.post('/v1/admin/groupproduct', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.create);
    app.get('/v1/groupproduct/:id',GroupProductCtrl.getOne);
    app.get('/v1/category/:categoryId/groupproducts',GroupProductCtrl.getByCategory);
    app.get('/v1/groupproducts',GroupProductCtrl.getAll);
    app.put('/v1/admin/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.update);
    app.delete('/v1/admin/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.delete);
}