const express = require('express');
const router = require('./routes/index')

const bodyParser = require('body-parser');
const app = new express();

//extended:false 不使用第三方模块处理参数，使用Nodejs内置模块querystring处理
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 解析 application/json
app.use(express.json()); 
// 解析 application/x-www-form-urlencoded
app.use(express.urlencoded());

//添加路由/接口
app.use(router);

module.exports = app



