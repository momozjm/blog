const connection = require('./services/connection')()
const search = require('./services/list/search')
const add = require('./services/detail/add')


// 引入 http 模块：http 是提供 Web 服务的基础
const http = require("http");

// 引入 url 模块：url 是对用户提交的路径进行解析
const url = require("url");

// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");

http.createServer(function (req, res) {

    // 设置 cors 跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 设置 header 类型
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // 跨域允许的请求方式
    res.setHeader('Content-Type', 'application/json');

    if (req.method == "POST") { // 接口 POST 形式
        let pathName = req.url;
        if (pathName == "/blog/add") { // 提交留言信息
            add(connection, req, res)
        }
    } else if (req.method == "GET") { // 接口 GET 形式
        let pathName = url.parse(req.url).pathname;
        if (pathName == "/login") {

        } else if (pathName == "/search") {


        }
    }

}).listen(8888); // 监听的端口

