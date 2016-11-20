`use strict`;

import Koa from "koa";
import Cors from "kcors";
import Router from "koa-router";
import convert from "koa-convert";
import query from "./pool";

const app = new Koa();
const cors = new Cors();
const router = new Router({
  prefix: ``
});

/**
 * 返回数据包裹器
 * @param data
 * @returns {*}
 */
const wrap = function (data) {
  let res;
  if (data.ok) {
    res = JSON.stringify({
      code: 200,
      msg: 'success',
      data: data.res
    });
  } else {
    res = JSON.stringify({
      code: 400,
      msg: data.res,
      data: null
    });
  }
  return res;
};

// 指定服务端口号
const PORT = 3010;

// API延迟时间配置
const DELAY = 0; // 0ms

// 延迟响应中间件
const delay = async(ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, DELAY);
  });
  await next();
};

// 延迟响应中间件
app.use(delay);
app.use(convert(cors));
app.use(router.routes());

// 获取标签
router.get('/tag', async(ctx, next) => {
  const sql = 'SELECT * FROM tag';
  const result = await query(sql);

  ctx.body = wrap(result);
});

// 获取文章
router.get('/article', async(ctx, next) => {
  const id = ctx.query.id;
  const sql = 'SELECT * FROM article WHERE id=' + id;
  const result = await query(sql, true);

  // 这里可以对数据库查询返回的数据进行再加工

  ctx.body = wrap(result);
});

router.get(`*`, async(ctx, next) => {
  ctx.set(`content-type`, `text/html; charset-utf8`);
  ctx.body = `<h1>${ctx.status}.</h1>`;
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}`);
});
