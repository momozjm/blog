module.exports = function (connection, req, res) {
    // 获取前端发来的路由地址
    let pathName = req.url;

    console.log("\n接口为：" + pathName);

    // 接收发送过来的参数
    let tempResult = "";

    // 数据接入中
    req.addListener("data", function (chunk) {
        tempResult += chunk;
    });

    // 数据接收完成
    req.addListener("end", function () {

        var result = JSON.parse(tempResult)
        const { name, type, url } = result
        const time = getNowFormatDate(); // 时间
        console.log("\n参数为：");
        console.log(tempResult, JSON.parse(tempResult));

        // 新增的 SQL 语句及新增的字段信息
        let addSql = "INSERT INTO blog(name,type,url, time) VALUES(?,?,?,?)";
        let addSqlParams = [name, type, url, time];

        // 连接 SQL 并实施语句
        connection.query(addSql, addSqlParams, function (error2, response2) {
            console.log(error2)
            if (error2) { // 如果 SQL 语句错误
                res.write(JSON.stringify({
                    code: 0,
                    message: "未知错误"
                }));
                // 结束响应
                res.end();
            } else {
                // 返回数据
                res.write(JSON.stringify({
                    code: 200,
                    message: "新增成功！"
                }));


                // 结束响应
                res.end();
            }
        });
        // 接口信息处理完毕
    })
}

// 获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear(); // 年
    var month = date.getMonth() + 1; // 月
    var strDate = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minute = date.getMinutes(); // 分
    var second = date.getMinutes(); // 秒
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // 返回 yyyy-mm-dd hh:mm:ss 形式
    var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
    return currentdate;
}
