# koa-mysql

[koa-server](https://github.com/8881/koa-server) 的基础上添加了操作数据库的方法

## 用途
需要操作 mysql 数据库的简单接口服务器，比如个人简易博客系统。

## 使用

参考 [koa-server的用法](https://github.com/8881/koa-server/blob/master/README.md)

区别在于获取到请求之后，根据条件查询数据库

pool.js是数据库配置信息，并对结果进行了包装

```
const pool = mysql.createPoolPromise({
  connectionLimit: 10, // 连接数
  host: '127.0.0.1',  // 地址
  user: 'root',  // 用户名
  password: '', // 密码
  database: 'blog',  // 数据库名,
  port: 3306 // 默认3306端口
});
```

#### example
获取指定 id 的文章

```
router.get('/article', async(ctx, next) => {
  const id = ctx.query.id;  // 获取请求地址中的id 例如：http://xxx.com?id=11
  const sql = 'SELECT * FROM article WHERE id=' + id;  // 构建数据库查询语句
  const result = await query(sql, true);  // 查询数据库

  ctx.body = wrap(result);  // 组装json数据
});
```


完.
