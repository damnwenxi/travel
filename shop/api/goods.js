const Router = require('koa-router');
const router = new Router();
const format = require('../libs/format');
const passport = require('koa-passport');

/**
 *  @GET 'goods/detail'
 *  @商品详情接口，接口是公开的
 *  param id id有两种取值，一种是页码，另一种是商品ID
 */
router.get('/detail', async ctx => {
    const id = ctx.query.id;
    // console.log(id);
    // console.log(id.length);
    // 当id长度超过9位时，判断为商品详情
    if (id.length>9) {
        try {
            const good = await ctx.db.query(
                "select * from goods where id = ?",
                [id]
            );
            if(good){
                ctx.status = 200;
                ctx.body = good;
            }else{
                ctx.status = 500;
                ctx.body = { msg: "你要查看的blog不存在或已被删除" };
            }
        } catch (e) {
            console.log(e);
        }
    } else {        //否则，此时的id代表页码
        try {
            const page = parseInt(id);
            const goods = await ctx.db.query(
                "select * from goods order by c_date desc limit ?,20",      //查询限制
                [page*20]
            );
            ctx.status = 200;
            ctx.body = goods;
        } catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { msg: "数据库获取数据失败。" };
        }
    }
});


/**
 *  @POST '/goods/add'
 *  @添加商品接口，接口是私密的，需要token验证
 */
router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id,1]
        );
        // console.log(user);
        if (user.length > 0) {
            const data = ctx.request.body;
            // 数据添加到数据库
            const newGood = [
                data.title,     //商品名称
                format(new Date()),  //创建时间
                parseInt(data.stock),  //库存
                parseFloat(data.price_in) ,  //进价
                parseFloat(data.price_out), //售价
                parseFloat(data.price_offer), //优惠价
                data.description,
                data.cover,
                ctx.state.user.name,
                data.date1,
                data.date2,
                data.region,
                data.type
            ];
            // 存
            const saveGood =  await ctx.db.query(
                "insert into goods(title,c_date,stock,price_in,price_out,price_offer,description,cover,whos,date1,date2,addr,type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                newGood
            );
            if(saveGood.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"添加商品成功",good:newGood};
            }
        } else {
            ctx.status = 300;
            ctx.body = { msg: '你不是系统用户，请不要尝试危险操作！' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

/**
 *  @GET '/goods/delete'
 *  @管理员删除商品
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
            const delGood = await ctx.db.query(
                "delete from goods where id = ?",
                [remove_id]
            );
            if(delGood.affectedRows > 0){
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
 *  @GET '/goods/edit'
 *  @管理员编辑商品信息页面
 *  param id
 *  @接口是私密的
 */
router.get('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id,1]
        );
        if (user.length > 0) {
            const edit_id = ctx.query.id;
            // 找到要修改的blog并将旧的内容返回到前台
            const findGood = await ctx.db.query(
                "select * from goods where id = ?",
                [edit_id]
            );
            if(findGood){
                ctx.status = 200;
                ctx.body = findGood;
            }else{
                ctx.status = 500;
                ctx.body = { msg: "你要查看的商品不存在或已被删除" };
            }
        } else {
            ctx.status = 400;
            ctx.body = { msg: '你不是管理员用户。' };
        }
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { msg: '崩了' };
    }
});



/**
 *  @POST '/goods/edit'
 *  @编辑blog，接口是私密的，需要token验证
 */
router.post('/edit', passport.authenticate('jwt', { session: false }), async ctx => {
    try {
        const user = await ctx.db.query(
            "select * from user where id = ? and role = ?",
            [ctx.state.user.id,1]
        );
        // console.log(user);
        if (user.length > 0) {
            const data = ctx.request.body;
            // 数据添加到数据库
            const newGood = [
                data.title,     //商品名称
                format(new Date()),  //创建时间
                data.stock,  //库存
                data.price_in,  //进价
                data.price_out, //售价
                data.price_offer, //优惠价
                data.description,
                data.cover,
                ctx.state.user.name,
                data.date1,
                data.date2,
                data.region,
                data.id
            ];

            // 存
            const updateGood = await ctx.db.query(
                "update goods set title=?,c_date=?,stock=?,price_in=?,price_out=?,price_offer=?,description=?,cover=?,whos=?,date1=?,date2=?,addr=? where id=? ",
                newGood
            );
            if(updateGood.affectedRows > 0){
                ctx.state = 200;
                ctx.body = {msg:"添加修改成功",good:newGood};
            }
        } else {
            ctx.status = 300;
            ctx.body = { msg: '你不是系统用户，请不要尝试危险操作！' };
        }
    } catch (e) {
        ctx.status = 500;
        console.log(e);
        ctx.body = { msg: '崩了！' };
    };
});

module.exports = router.routes();
