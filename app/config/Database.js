require("dotenv").config();
let DBConnectorSetting = [
    {
        host: "dpg-ceiid2la499eu91e3tt0-a.singapore-postgres.render.com",
        port: "5432",
        username: "demo_zf2b_user",
        password: "DahSDDkWkpHwtP7lmD9Er034DdxrlKx8",
        database: "demo_zf2b",
        dialect: "postgres",
        ssl: true,
    },
];

module.exports = DBConnectorSetting;
