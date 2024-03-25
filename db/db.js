
const config = require("../config/config")
module.exports = function (success , error) {
    // 1. 导入mongoose
    const mongoose = require('mongoose');

    // 2. 设置strictQuery 为 true
    mongoose.set("strictQuery" , true);

    // 3. 连接 mongoose 服务
    mongoose.connect(`mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`);

    // 4. 设置回调
    mongoose.connection.once('open' , () => {
        success()
    })

    mongoose.connection.on('error' , () =>{
        error()
    })
}