import Vue from 'vue'
import App from './App.vue'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router'
//引入仓库
import store from './store'
Vue.config.productionTip = false

//引入MockServe.js--mock数据
import '@/mock/mockServe'

//引入swiper样式
import "swiper/css/swiper.css"

//统一接口api文件夹里面全部请求函数
import * as API from '@/api';

import VueLazyload from 'vue-lazyload';
import logo from '@/assets/logo.png';
Vue.use(VueLazyload, {
    //懒加载默认图片
    loading: logo
})

//引入表单校验插件
import "@/plugins/validate";

new Vue({
    render: h => h(App),
    // 全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 注册路由
    router,
    //注册仓库：组件实例身上会多一个$store属性
    store
}).$mount('#app')