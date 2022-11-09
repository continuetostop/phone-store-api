const Express = require('express');
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const bodyParser = require('body-parser');
const MySequenlize = require('./app/utils/Sequelize');
const Role = require('./app/models/Role.model');
const db = require('./app/models/index')
const cookieSession = require("cookie-session");

// const Ngrok = require('ngrok');


// token = '1ouoc8rz6vlbN0ogudeEfHrPDxX_6seu3PQbofh1X2RgT7VaV';
// // Creating Ngrok Tunnel
// (async function () {
//     const url = await Ngrok.connect({ authtoken: token, addr: 3000 });
//     //console.log('Your url: ' + Reset, url);
//     console.log(url);
// })();
let app = Express();

app.use(BodyParser.json({
    limit: '5mb'
}))

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))

app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}))

app.use(MethodOverride('X-HTTP-Method-Override'));

app.use(
    cookieSession({
        name: "cookie",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true,
        sameSite: 'strict'
    })
);

app.all('/*', [require('./app/middlewares/AllowCossDomain')]);

app.use(Express.static(__dirname + '/public'));
MySequenlize.sync()
//MySequenlize.sync({alert:true});
//MySequenlize.sync({force:true}).then(()=>{
//   Role.bulkCreate([
//       { name: "admin" },
//       { name: "moderator" },
//       { name: "user" },
//   ]).then(() => console.log("Users data have been saved"));
//})

require('./app/routes')(app);
app.listen(3000, () => {
    console.log('Server app running on port 3000!');
})
