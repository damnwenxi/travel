const Router = require('koa-router');
const router = new Router();
const format = require('../libs/format');
const passport = require('koa-passport');

/**
 *  @GET '/comment'
 *  @获取个人评论数据接口，接口是公开的
 *  query id
 */
router.get('/', async ctx => {
    const good_id = ctx.query.id;
    try {
        const comments = await ctx.db.query(
            "select * from comment where good_id = ?",
            [good_id]
        );

        ctx.status = 200;
        ctx.body = { comments: comments };
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

/**
 *  @GET '/comment/user'
 *  @获取个人评论数据接口，接口是公开的
 *  query id
 */
router.get('/user', async ctx => {
    const user_id = ctx.query.id;
    try {
        const comments = await ctx.db.query(
            "select * from comment where user_id = ?",
            [user_id]
        );
        ctx.status = 200;
        ctx.body = { comment: comments };
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});

/**
 *  @GET '/comment/all?id=id'
 *  @获取所有评论数据接口，接口是私密的
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
            const findComment = await ctx.db.query(
                "select * from comment limit ?,20",
                [page * 20]
            );
            ctx.status = 200;
            ctx.body = { msg: 'success', comment: findComment };
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
 *  @GET '/comment/delete'
 *  @删除评论接口，接口是私密的，要token认证
 *  query ID
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const del_id = ctx.query.id;
            const delComment = await ctx.db.query(
                "delete from comment where id = ?",
                [del_id]
            );
            if (delComment.affectedRows > 0) {
                ctx.status = 200;
                ctx.body = { msg: '评论删除成功' };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '未登录或用户不存在' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 404;
        ctx.body = { msg: 'not found.' };
    }
});


/**
*  @POST '/comment/add'
*  @发表评论接口，接口是私密的，登录用户可参与评论
*/
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const data = ctx.request.body;
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const commnet = [
                ctx.state.user.id,
                format(new Date()),
                data.content,
                data.good_id,
                ctx.state.user.name,
                ctx.state.user.avatar
            ];

            const saveComment = await ctx.db.query(
                "insert into comment(user_id,c_date,content,good_id,user_name,avatar) values(?,?,?,?,?,?)",
                commnet
            );
            if (saveComment.affectedRows > 0) {
                ctx.status = 200;
                ctx.body = { msg: "评论发表成功"};
            }
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

module.exports = router.routes();
