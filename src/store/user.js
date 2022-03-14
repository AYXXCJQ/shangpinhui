//登陆与注册
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
//state:仓库存储数据的地方
const state = {
    code: "",
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
};
//mutations:修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem('TOKEN')
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //登陆业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            //用户已经登陆成功并且获得token
            commit("USERLOGIN", result.data.token);
            //持久存储token
            localStorage.setItem("TOKEN", result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登陆
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
}

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters,
};