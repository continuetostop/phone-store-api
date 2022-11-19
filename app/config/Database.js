require('dotenv').config()
let DBConnectorSetting = [
    {
        host: process.env.DBHOST||"remotemysql.com",
        port:"3306",
        username:process.env.DBUSERNAME||'1baCA5TYVo',
        password:process.env.DBPASSWORD||'inDfxhNebE',
        database:process.env.DBDATABASE||'1baCA5TYVo',
        dialect:"mysql"

    }
];

module.exports=DBConnectorSetting;