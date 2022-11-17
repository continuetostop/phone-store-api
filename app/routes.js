module.exports =function(app){
    // require('./route/message')(app);
    require('./route/auth')(app);
    require('./route/category')(app);
    require('./route/groupProduct')(app);
    require('./route/productDetail')(app);
    require('./route/order')(app);
    require('./route/option')(app);

}