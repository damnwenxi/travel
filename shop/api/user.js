const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const Valid = require('../libs/valid');
const passport = require('koa-passport');
const md5 = require('../libs/md5');
const config = require('../config');
const formart = require('../libs/format');
// const passport = require('koa-passport');

/**
 *  @POST '/user/login'
 *  @登录接口，接口是公开的
 *  登录成功生成token
 */
router.post('/login', async ctx => {
    const data = ctx.request.body;
    // 数据验证
    const { errors, isValid } = await Valid.loginValid(data);
    if (!isValid) {
        ctx.status = 201;
        ctx.body = errors;
        return;
    }
    // 登陆信息校验
    const find = await ctx.db.query(
        //sql查询
        "select * from user where email=? or phone=?",
        [data.email,data.email]
    );
    if(find.length<1){
        ctx.status = 201;
        ctx.body = {msg:'用户不存在！'}; 
        return; 
    }
    const user = JSON.parse(JSON.stringify(find[0]));

    if(!user){
        ctx.status = 201;
        ctx.body = {msg:'用户不存在！'}; 
    }else{
        // 验证密码
        if(md5(data.password) == user.password){
            // 密码对，生成token
            const payload = {id:user.id,name:user.name,avatar:user.avatar};
            const token = jwt.sign(payload,config.TOKEN_KEY,{expiresIn:config.TOKEN_VALID_TIME});
            ctx.status = 200;
            ctx.body = {success:true,token: "Bearer " + token,user:user};
        }else{  
            ctx.status = 201;
            ctx.body = {msg:'密码错误！'};
        }
    }
});


/**
 *  @POST 'user/register'
 *  @注册接口，接口是公开的
 */
router.post('/register', async ctx => {
    try{
        //接收表单数据
    const data = ctx.request.body;
    // 验证
    const { errors, isValid } = await Valid.RegisterValid(data);
    if (!isValid) {
        ctx.status = 201;
        ctx.body = errors;
        return;
    }
    // 验证用户名是否存在
    const exsitUser = await ctx.db.query(
        "select * from user WHERE email=? or phone=?",
        [data.email,data.phone]
    );
    if(exsitUser.length>0){
        ctx.status = 201;
        ctx.body = {msg:'此账号已存在，请直接登录'}; 
    }else{
        // 注册用户信息
        const newUser = [
            formart(new Date()),
            data.name,
            data.email,
            data.sex,
            "",
            data.phone,
            md5(data.password1)
        ];
        try{
            const savaUser = await ctx.db.query(
                "insert into user(c_date,name,email,sex,avatar,phone,password) values(?,?,?,?,?,?,?)",
                newUser
            );
            if(savaUser.affectedRows > 0){
                const findUser = await ctx.db.query(
                    "select * from user where email =?",
                    data.email
                );
                const user = JSON.parse(JSON.stringify(findUser[0]));
                const payload = {id:user.id,name:user.name,avatar:user.avatar};
                const token = jwt.sign(payload,config.TOKEN_KEY,{expiresIn:config.TOKEN_VALID_TIME});
                ctx.status=200;
                ctx.body = {msg:"用户注册成功",user:user,token: "Bearer " + token};
            }
        }catch(e){
            ctx.status = 500;
            ctx.body = {msg:"崩了"};
            console.log(e);
        }    
    };
    }catch(e){
        console.log(e);
    }
});


/**
 *  @GET '/user/all?id=id'
 *  @获取所有用户数据接口，接口是私密的
 *  query id
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = 1",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const page = parseInt(ctx.query.id);
            const findUser = await ctx.db.query(
                "select * from user limit ?,20",
                [page * 20]
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', user: findUser };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

/**
 *  @GET '/user/detail'
 *  @获取个人信息接口，接口是私密的
 *  query id
 */
router.get('/detail', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            ctx.status = 200;
            ctx.body = { msg: 'success', user: user };
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户没有权限' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

/**
 *  @GET '/user/delete'
 *  @管理员删除用户
 *  param id
 *  @接口是私密的
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id,1]
        );
        if (user.length > 0) {
            const remove_id = ctx.query.id;
            // 删除操作
            const delUser = await ctx.db.query(
                "delete from user where id = ? and role =0",
                [remove_id]
            );
            if(delUser.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"删除成功"};
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: '崩了' };
    }
});


/**
 *  @GET '/user/delete'
 *  @管理员删除用户
 *  param id
 *  @接口是私密的
 */
router.get('/set', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id,1]
        );
        if (user.length > 0) {
            const remove_id = ctx.query.id;
            // 删除操作
            const delUser = await ctx.db.query(
                "update user set role=1 where id = ?",
                [remove_id]
            );
            if(delUser.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"设置成功"};
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: '崩了' };
    }
});


module.exports = router.routes();
