const OptionCtrl= require('../controllers/OptionCtrl');

module.exports=function (app){
    app.post('/v1/groupproduct/:groupProductId/option',OptionCtrl.create);
    app.get('/v1/groupproduct/:groupProductId/options/',OptionCtrl.getOptionByGroupProduct);
    app.put('/v1/groupproduct/:groupProductId/option/:id',OptionCtrl.update);
    app.delete('/v1/groupproduct/:groupProductId/option/:id',OptionCtrl.delete);
}