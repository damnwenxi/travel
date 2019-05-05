
前端相关代码只用管src里面的就行了
注意 根目录下的static文件夹不能删 即使是空的也不能删



1./components 最重要的文件夹 里面是各个组件
    >/admin 里面是跟管理员操作相关的组件
        >.addgoods.vue 添加商品组件
        >.admin.vue 管理员主界面组件
        >.comment.vue 评论列表组件
        >.editgood.vue 编辑商品组件
        >.goods.vue 商品列表组件
        >.order.vue 订单列表组件
        >.user.vue 用户列表组件
        >.router.js 路由配置信息

    >.cart.vue 购物车组件
    >.detail.vue 商品详情组件
    >.footer.vue 底部信息组件
    >.goods.vue 首页商品组件
    >.header.vue 头部导航栏组件
    >.login.vue 登录组件
    >.register.vue 注册组件
    >.settle.vue 订单结算组件
    >.config.js 请求服务端的根地址

2./App.vue 根组件

3./main.js 入口文件 根组件在这里面new出来   

4./upload 上传图片存放目录

5.index.html 首页

6.package.json 包管理文件 项目里面所有用到的包都是通过这个json文件来下载的

7.node_modules 所有依赖包