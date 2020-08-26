// const express = require('express');
// const app = express();

// var server = app.listen(3000, "127.0.0.1", function () {
//     var host = server.address().address;
//     var port = server.address().port;
// });

// /********************socketIO********************/
// var io = require('socket.io').listen(server);
// // 建立连接
// io.sockets.on('connection', function (socket) { //此处每个回调socket就是一个独立的客户端，通常会用一个公共列表数组统一管理
//     // 连接断开，如关闭页面时触发
//     socket.on('disconnect', function () {
//         console.log('已断开链接');
//     });
//     // 监听客户端发送的消息
//     socket.on('clientmessage', function (data) {
//         //推送给除自己外其他所有用户的消息，类似于广播
//         socket.broadcast.emit('message', {
//             text: '你的朋友上线了'
//         });
//     });
//     //发送给自己的消息
//     socket.emit('message', {
//         text: '你上线了'
//     });
// });