//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
// 引入store
import store from '@/store'
Vue.use(VueRouter)

//先把VueRouter原型对象的push 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功回调
//第三个参数：失败回调
// call和apply
// 相同点， 都可以调用函数一次， 都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        //滚动条在最上方
        return { y: 0 };
    }
})

//全局守卫：前置守卫(在路由跳转之间判断)
router.beforeEach(async(to, from, next) => {
    //用户登录才会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登陆，不能去login
        if (to.path == '/login') {
            next('/home');
        } else {
            if (name) {
                next();
            } else {
                //如果没有用户信息，派发action让仓库存储用户信息
                //获取用户信息，在首页展示
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登陆
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }

        }
    } else {
        //未登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录时想去的路径保存
            next('/login?redirect=' + toPath)
        } else {
            next();
        }
    }
})

export default router