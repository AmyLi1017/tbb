import Fly from 'flyio/dist/npm/wx'
import URL from './const'
import store from '@/store/index'
import cfg from '@/utils/config'
import utils from '@/utils/index'


let fly = new Fly()
    //添加拦截器
fly.interceptors.request.use((config, promise) => {
    //给所有请求添加自定义header
    config.headers["X-Tag"] = "flyio";
    config.headers["version"] = cfg.version;
    config.headers["token"] = store.state.token
    config.headers['client'] = '1'
    config.headers['openid'] = wx.getStorageSync("openid");
    if (store.state.paramtoken != '') {
        config.headers['paramtoken'] = store.state.paramtoken[0];
    }
    return config;
});
fly.config.timeout = 60000
fly.config.baseURL = URL.BASE_URL
    //添加响应拦截器，响应拦截器会在then/catch处理之前执行

fly.interceptors.response.use(
    (response) => {
        if (response.headers.paramtoken != '' && response.headers.paramtoken) {
            store.commit('saveParamToken', { paramtoken: response.headers.paramtoken })
        } //高级搜索请求返回的参数paramtoken
        //只将请求结果的data字段返回
        let result = response.data
        console.log('request',response.request);
        console.log('res',result)
            // if (result.code == 10003) {
            //     store.dispatch('showLimit')
            // }
            // if (result.code == 10004) {
            //     store.dispatch('showBind')
            // }
      return utils.dataCode(result)
    },
    (err) => {
        //发生网络错误后会走到这里
        return Promise.reject(err)
    }
)
export default fly;
