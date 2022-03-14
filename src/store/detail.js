//datail小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//封装
import { getUUID } from '@/utils/uuid_token';
//state:仓库存储数据的地方
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
};
//mutations:修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //路径导航数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    //产品信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
};