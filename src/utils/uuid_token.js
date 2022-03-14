import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串，且不能发生变化
export const getUUID = () => {
    // 看一下本地存储是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有，就生成
    if (!uuid_token) {
        uuid_token = uuidv4();
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return uuid_token
}