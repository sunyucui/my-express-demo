var express = require('express');
var router = express.Router(); //创建路由容器
var users = require('./users');

/**
 * 获取数据
 * params{}
 * return 
 */
router.get('/users', (request, response, next) => {

  users.getUsers().then(data => {
    response.send({ code: 0, message: 'getuser success', data: data })
    console.log('request getusers')
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
});
/**
 * 分页查询
 */
router.get('/usersByPage', (request, response, next) => {

  users.getUsersByPage(request.query.current, request.query.pageSize).then(data => {
    response.send({ code: 0, message: 'getuser success', ...data })
    console.log('request getusers')
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
});


router.get('/usersById',(request,response) => {
  console.log('id: ',request.body)
  users.getUserById(request.query.id).then(data => {
    response.send({ code: 0, message: 'getuserbyid success', data: data })
    console.log('request getusers')
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
})
/**
 * 添加
 * params {user}
 * return 
 */
router.post('/users/adduser', (request, response, next) => {
  console.log('add user',request.body)
  users.addUser(request.body).then((data => {
    response.send({ code: 0, message: 'add success', data: null });
    console.log('request addUser')
  })).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
})

/**
 * 修改
 * params {user}
 * return 
 */
router.post('/users/updateUser', (request, response) => {
  users.updateUser(request.body).then(data => {
    response.send({ code: 0, message: 'update success', data: null });
    console.log('request updateUser')
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
})

/**
 * 刪除用戶
 * return id
 */
router.get('/users/deleteUser', (request, response) => {
  const id = request.query.id
  users.deleteUser(id).then(data => {
    response.send({ code: 0, message: 'delete success', data: id });
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
})
/**
 * 获取dept列表
 */
router.get('/users/getDeptList',(request, response) => {
  users.getDeptList().then(data => {
    response.send({ code: 0, message: 'get dept success', data: data })
  }).catch(err => {
    response.status(500).send('Server Error');
    console.log(err)
  })
})



module.exports = router;
