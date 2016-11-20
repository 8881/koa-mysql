'use strict';

import mysql from "mysql2";

const pool = mysql.createPoolPromise({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'blog'
});

/**
 * 数据库查询方法
 * @param sql  SQL语句
 * @param needsObj  是否需要返回对象,默认返回数组
 * @returns {*}
 */
const query = async(sql, needsObj) => {
  return pool.getConnection().then(function (conn) {
    const res = conn.query(sql);
    conn.release();
    return res;
  }).then(function (res) {
    // console.log(res[0]);
    return {
      ok: true,
      res: needsObj ? res[0][0] : res[0]
    };
  }).catch(function (ex) {
    // console.log(ex);
    return {
      ok: false,
      res: ex
    };
  });
};

export default query;
