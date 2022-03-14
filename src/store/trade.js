//登陆与注册
import { reqAddressInfo, reqOrderInfo } from '@/api'
//state:仓库存储数据的地方
const state = {
    address: [],
    orderInfo: {},
};
//mutations:修改state的唯一手段
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data);
        }
    },
    //获取用户地址信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
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