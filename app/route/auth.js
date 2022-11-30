const AuthCtrl= require('../controllers/AuthCtrl');
const verifySignUp= require('../middlewares/verifySignUp');

module.exports=function (app){
  //   app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
    app.post('/api/v1/auth/signup',[
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],AuthCtrl.signup);
    app.post('/api/v1/auth/signin',
      AuthCtrl.signin);
    app.post('/api/v1/auth/signout',AuthCtrl.signout);
}