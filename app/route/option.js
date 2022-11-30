const OptionCtrl= require('../controllers/OptionCtrl');

module.exports=function (app){
    app.post('/api/v1/groupproduct/:groupProductId/option',OptionCtrl.create);
    app.get('/api/v1/groupproduct/:groupProductId/options/',OptionCtrl.getOptionByGroupProduct);
    app.put('/api/v1/groupproduct/:groupProductId/option/:id',OptionCtrl.update);
    app.delete('/api/v1/groupproduct/:groupProductId/option/:id',OptionCtrl.delete);
}