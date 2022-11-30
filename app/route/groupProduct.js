const GroupProductCtrl= require('../controllers/GroupProductCtrl');
const authJwt =require('../middlewares/authJwt')

module.exports=function (app){
    app.post('/api/v1/auth/admin/groupproduct', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.create);
    app.get('/api/v1/groupproduct/:id',GroupProductCtrl.getOne);
    app.get('/api/v1/category/:categoryId/groupproducts',GroupProductCtrl.getByCategory);
    app.get('/api/v1/groupproducts',GroupProductCtrl.getAll);
    app.put('/api/v1/auth/admin/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.update);
    app.delete('/api/v1/auth/admin/groupproduct/:id', [authJwt.verifyToken, authJwt.isAdmin],GroupProductCtrl.delete);
}