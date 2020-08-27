
module.exports = function () {
    // 连接 MySQL：先安装 npm i mysql -D
    var mysql = require('mysql');
    // MySQL 的连接信息
    var connection = mysql.createConnection({
        host: '47.114.140.199',
        user: 'root',
        password: 'wazjm1994@',
        database: 'data'
    });
    // 开始连接
    connection.connect();

    return connection
}