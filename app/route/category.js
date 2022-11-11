const CategoryCtrl= require('../controllers/CategoryCtrl');

module.exports=function (app){
    app.post('/v1/category',CategoryCtrl.create);
    app.get('/v1/category/:id',CategoryCtrl.getOne);
    app.get('/v1/category',CategoryCtrl.getAll);
    app.put('/v1/category/:id',CategoryCtrl.update);
    app.delete('/v1/category/:id',CategoryCtrl.delete);
}