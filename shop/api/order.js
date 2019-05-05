const Router = require('koa-router');
const router = new Router();
const format = require('../libs/format');
const passport = require('koa-passport');

/**
 *  @GET 'order/'
 *  @获取个人订单接口，接口是私密的
 *  query 用户ID
 */
router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const order = await ctx.db.query(
                "select * from order_list where user_id = ?",
                [ctx.state.user.id]
            );
            if (order.length > 0) {
                ctx.status = 200;
                ctx.body = order;
            } else {
                ctx.status = 200;
                ctx.body = { msg: "您还没有订单，快去下单吧" };
            }
        } else {
            ctx.status = 300;
            ctx.body = { msg: "未登录或用户不存在" };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { msg: "崩了" };
        console.log(e);
    }

});


/**
 *  @GET '/order/add'
 *  @添加订单接口，接口是私密的，需要token验证
 */
router.get('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const good_id = ctx.query.id;
        const price = ctx.query.price;
        const addr = ctx.query.addr;
        const note = ctx.query.note;
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        // console.log(user);
        if (user.length > 0) {

            const ifExist = await ctx.db.query(
                "select * from order_list where good_id = ? and user_id = ? and state = 0",
                [good_id, ctx.state.user.id]
            );
            if (ifExist.length) {
                ctx.state = 200;
                ctx.body = { msg: "该商品已经在购物车中了，请不要重复添加" };
                return;
            } else {
                // 数据添加到数据库
                const newOrder = [
                    ctx.state.user.id,
                    parseFloat(price),
                    format(new Date()),
                    good_id,
                    addr,
                    note
                ];
                // 存 购物车
                const saveOrder = await ctx.db.query(
                    "insert into order_list(user_id,price,c_date,good_id,addr,note) values(?,?,?,?,?,?)",
                    newOrder
                );

                // console.log(saveOrder);
                if (saveOrder.affectedRows > 0) {
                    ctx.state = 200;
                    ctx.body = { msg: "添加购物车成功", order_id: saveOrder.insertId };
                }
            }
        } else {
            ctx.status = 401;
            ctx.body = { msg: '未登录或用户不存在' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

/**
 *  @GET '/order/delete'
 *  @取消订单
 *  query id
 *  @接口是私密的
 */
router.get('/delete', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const remove_id = ctx.query.id;
            // 删除操作
            const delOrder = await ctx.db.query(
                "delete from order_list where id = ?",
                [remove_id]
            );
            if (delOrder.affectedRows > 0) {
                ctx.state = 200;
                ctx.body = { msg: "已为您取消订单" };
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
 *  @GET '/order/all'
 *  @管理员获取所有订单
 *  @接口是私密的
 */
router.get('/all', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id, 1]
        );
        if (user.length > 0) {
            const page_id = ctx.query.id;
            const allOrder = await ctx.db.query(
                "select * from order_list limit ?,20",
                [page_id * 20]
            );
            if (allOrder) {
                ctx.status = 200;
                ctx.body = allOrder;
            } else {
                ctx.status = 200;
                ctx.body = { msg: "暂无订单" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '此管理员账号不存在' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了' };
    }
});

/**
 *  @GET '/order/state'
 *  @订单状态改变接口
 *  @接口是私密的
 * @param state
 */
router.get('/state', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ?",
            [ctx.state.user.id]
        );
        if (user.length > 0) {
            const state = parseInt(ctx.query.state);
            const id = ctx.query.id;
            const time = format(new Date());

            // console.log(state,id,time);

            const updateOrder = await ctx.db.query(
                "update order_list set state=?,pay_date=? where id = ?",
                [state, time, id]
            );
            // console.log(updateOrder);
            if (updateOrder.affectedRows > 0) {
                ctx.status = 200;
                ctx.body = { msg: "订单状态修改成功" };
            } else {
                ctx.status = 500;
                ctx.body = { msg: "数据库错误" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '此管理员账号不存在' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了' };
    }
});


module.exports = router.routes();
