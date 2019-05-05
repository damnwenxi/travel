const Koa = require('koa');
const db = require('./libs/db');
// 引入配置文件
const {APP_PORT} = require('./config');
const Router = require('koa-router');
const passport = require('koa-passport');
// post数据解析中间件
const Koabody = require('koa-body');
const path = require('path');
const static = require('koa-static');
// const session = require('koa-session');


const app = new Koa();

// // 加密
// app.keys = ['hjfadfbndhUI6&*U*9764?>"?8735hr7676&%^$^%IOUGHGYRvghdRT'];

// // 使用session中间件
// app.use(session({
//     key: 'is_login', /** cookie的名称，可以不管 */
//     maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: true, /** (boolean) signed or not (default true) */
//   },app));

// 设置上下文属性 （控制允许访问来源 这里设置为任何来源）
app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Headers','*');
    ctx.set('Access-Control-Allow-Origin','*');
    await next();
});

// 把数据库加入到上下文属性中
app.context.db = db;

// 允许静态资源访问
app.use(static(
    path.join(__dirname)
));

// 定义路由
const router = new Router();

// 数据验证
app.use(passport.initialize());
app.use(passport.session());
// 回调passport
require('./libs/passport')(passport);

// 使用koa-body中间件
app.use(Koabody({
    multipart:true,  //允许文件格式
    formidable:{
        keepExtensions:true,
        maxFileSize:20*1024*1024
    }
}));


/**
 * 测试接口 /
 * GET返回服务器连接成功提示
 */

 router.get('/',async ctx=>{
     ctx.body = {msg:'server is connected!'};
 });


//  配置路由
router.use('/goods',require('./api/goods'));
router.use('/user',require('./api/user'));
router.use('/comment',require('./api/comment'));
router.use('/order',require('./api/order'));
router.use('/upload',require('./api/upload'));
// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());
// 监听端口
app.listen(APP_PORT,()=>{
    console.log(`app is running at port ${APP_PORT}.`);
});
