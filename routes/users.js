/**
 * 连接数据库
 * 
 * 需要添加查询select的项dept的不重复的项
 * - 增删改查数据
 */
const mysql = require('mysql');

// 驱动连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunyucui',
  database: 'mydb'
});

connection.connect();

/**
 * 
 * @returns 查询所有员工
 */
exports.getUsers = async () => {
  return new Promise((resolve, reject) => {
    connection.query('select * from usersinfo', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}
/**
 * select * from usersinfo limit (current-1)*pageSize,pageSize, 
 * @param {分页查询} user 
 * @returns 
 */
exports.getUsersByPage = async (current, pageSize) => {
  const start = (current - 1) * pageSize;

  // const total = await connection.query('select count(*) from usersinfo',)
  return new Promise((resolve, reject) => {
    connection.query('select count(*) as total from usersinfo', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  }).then(result => {
    return new Promise((res,rej)=> {
      connection.query(`select * from usersinfo limit ${start}, ${pageSize}`, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res({total:result[0].total,data,page:current})
        }
      })
    })
  },(err) => {
    console.log(err)
  } )
}
/**
 * 根据id查询单个用户
 * @param {getuserById} id 
 * @returns 
 */
exports.getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from usersinfo where id=${id}`, (err,data) => {
      if(err){
        reject(err);
      } else {
        resolve(data)
      }
    })
  })
}
/**
 * 添加员工
 * @param {*} user 
 * @returns 
 */
exports.addUser = async (user) => {
  user.createtime = new Date().toLocaleString();
  return new Promise((resolve, reject) => {
    connection.query(`insert into usersinfo (username,dept,sex,age,birthday,createtime,remark) value 
    ('${user.username}','${user.dept}',${user.sex},${user.age},'${user.birthday}','${user.createtime}','${user.remark}')`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
  })
}
/**
 * 修改员工
 * @param {*} user 
 * @returns 
 */
exports.updateUser = async (user) => {
  user.createtime = new Date().toLocaleString();
  return new Promise((resolve, reject) => {
    connection.query(`update usersinfo set 
    username='${user.username}',dept='${user.dept}',sex=${user.sex},age=${user.age},birthday='${user.birthday}',createtime='${user.createtime}',remark='${user.remark}' 
    where id=${user.id}`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data)
        }
      })
  })
}
/**
 * 删除用户
 * @param {*} id 
 * @returns 
 */
exports.deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`delete from usersinfo where id=${id}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}
/**
 * 
 * @returns 查询部门种类 显示在select 
 */
exports.getDeptList = async () => {
  return new Promise((resolve, reject) => {
    connection.query('select distinct dept from usersinfo', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}