
1./api 里面是各种接口文件，每一个文件里面的每一个接口前面都有对应的注解。
    >comment.js 是评论相关接口
    >goods.js 是旅游产品相关接口
    >order.js 是订单相关接口
    >upload.js 是商品背景图上传接口
    >user.js 是用户相关接口

2./config 里面是一些公用的配置信息 
    >只有一个index.js文件 引入config会自动加载index.js文件

3./libs 下是一些自己写的工具库
    >db.js 数据库配置
    >format.js 时间日期格式化
    >md5.js 密码加密
    >passport.js token验证回调
    >valid.js 表单数据格式验证

4./upload 上传图片存放目录

5.app.js 主要入口文件 配置服务端相关 中间件使用

6.package.json 包管理文件 项目里面所有用到的包都是通过这个json文件来下载的

7.node_modules 所有依赖包