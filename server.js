const Express = require("express");
const BodyParser = require("body-parser");
const MethodOverride = require("method-override");

const MySequenlize = require("./app/utils/Sequelize");
const Role = require("./app/models/Role.model");
const StatusOrder = require("./app/models/StatusOrder.model");
const db = require("./app/models/index");


const port = process.env.PORT || 8080;

let app = Express();

app.use(
    BodyParser.json({
        limit: "5mb",
    })
);

app.use(
    BodyParser.json({
        type: "application/vnd.api+json",
    })
);

app.use(
    BodyParser.urlencoded({
        limit: "5mb",
        extended: true,
    })
);

app.use(MethodOverride("X-HTTP-Method-Override"));


app.all("/*", [require("./app/middlewares/AllowCossDomain")]);

app.use(Express.static(__dirname + "/public"));
try {
    MySequenlize.sync();
    // MySequenlize.sync({alert:true});
    // MySequenlize.sync({ force: true }).then(() => {
    //     Role.bulkCreate([
    //         { name: "admin" },
    //         { name: "moderator" },
    //         { name: "user" },
    //     ])
    //         .then(() => {
    //             StatusOrder.bulkCreate([
    //                 { id: 0, orderStatusName: "cancel" },
    //                 { id: 1, orderStatusName: "spendding" },
    //                 { id: 2, orderStatusName: "confirm" },
    //                 { id: 3, orderStatusName: "send" },
    //                 { id: 4, orderStatusName: "complete" },
    //             ]);
    //         })
    //         .then(() => console.log("Users data have been saved"));
    // });
} catch (err) {
    console.log(err);
}

app.get("/", function (req, res) {
    // console.log('debug');
    res.send("Hello World");
});
require("./app/routes")(app);
// const host = '0.0.0.0';
app.listen(port, () => {
    console.log(`Server app running on port ${port}!`);
});
