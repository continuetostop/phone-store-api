const GroupProductCtrl= require('../controllers/GroupProductCtrl');

module.exports=function (app){
    app.post('/v1/groupproduct',GroupProductCtrl.create);
    app.get('/v1/groupproduct/:id',GroupProductCtrl.getOne);
    app.get('/v1/groupproducts',GroupProductCtrl.getAll);
    app.put('/v1/groupproduct/:id',GroupProductCtrl.update);
    app.delete('/v1/groupproduct/:id',GroupProductCtrl.delete);
}