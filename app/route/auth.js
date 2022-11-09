const AuthCtrl= require('../controllers/AuthCtrl');
const verifySignUp= require('../middlewares/verifySignUp');

module.exports=function (app){
    app.post('/v1/auth/signup',[
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],AuthCtrl.signup);
    app.post('/v1/auth/signin',
      AuthCtrl.signin);
    app.post('/v1/auth/signout',AuthCtrl.signout);
}