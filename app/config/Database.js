require('dotenv').config()
let DBConnectorSetting = [
    {
        host: process.env.DBHOST||'37.59.55.185',
        port:3306,
        username:process.env.DBUSERNAME||'1baCA5TYVo',
        password:process.env.DBPASSWORD||'inDfxhNebE',
        database:process.env.DBDATABASE||'1baCA5TYVo',
        dialect:"mysql"

    }
];

module.exports=DBConnectorSetting;