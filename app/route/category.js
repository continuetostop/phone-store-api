const CategoryCtrl= require('../controllers/CategoryCtrl');
const authJwt =require('../middlewares/authJwt')

module.exports=function (app){
    app.post('/v1/admin/category', [authJwt.verifyToken, authJwt.isAdmin],CategoryCtrl.create);
    app.get('/v1/category/:id',CategoryCtrl.getOne);
    app.get('/v1/category',CategoryCtrl.getAll);
    app.put('/v1/admin/category/:id', [authJwt.verifyToken, authJwt.isAdmin],CategoryCtrl.update);
    app.delete('/v1/category/:id',[authJwt.verifyToken, authJwt.isAdmin],CategoryCtrl.delete);
}