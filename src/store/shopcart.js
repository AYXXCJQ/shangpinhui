//shopcart小仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckByid } from '@/api'
//state:仓库存储数据的地方
const state = {
    cartList: []
};
//mutations:修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //修改购物车产品选中状态
    async updateCheckById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckByid(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    },
    //修改全部商品的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckById', { skuId: item.skuId, isChecked });
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
    }
}

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

};

export default {
    state,
    mutations,
    actions,
    getters,
};