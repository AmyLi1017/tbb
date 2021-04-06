// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import api from '../net/api'
import utils from '../utils/index'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
let store
Vue.use({
    install(Vue, options) {

        store = new Vuex.Store({
            state: {
                count: 0,
                today: '',
                favMap: [],
                clearCert: false,
                provinces: [],
                bidTimes: [],
                showModal: false,
                user: wx.getStorageSync("user") ? JSON.parse(wx.getStorageSync("user")) : null,
                userStatus: wx.getStorageSync("userStatus") ? wx.getStorageSync("userStatus") : '',
                userStatusExpire: wx.getStorageSync("userStatusExpire") ? wx.getStorageSync("userStatusExpire") : '',
                token: wx.getStorageSync("token") ? wx.getStorageSync("token") : '',
                paramtoken: wx.getStorageSync("paramtoken") ? wx.getStorageSync("paramtoken") : '',
                certs: [],

                //taobanban---------------------------
                role: wx.getStorageSync("role") ? JSON.parse(wx.getStorageSync("role")) : 0, //角色:0,企业，1：班组 2：工人
            },
            mutations: {
                changeCount: (state, payload) => {
                    state.count = payload.count
                },
                changeToday: (state, payload) => {
                    state.today = payload.today
                },
                updateFavData: (state, payload) => {
                    console.log(payload)
                    let companyId = payload.companyId
                    state.favMap.push(companyId)
                    console.log(state.favMap)
                },
                updateProvince: (state, payload) => {
                    state.provinces = payload.provinces
                },
                updateShowModal: (state, payload) => {
                    state.showModal = payload.showModal
                },
                updateClear: (state, payload) => {
                    state.clearCert = payload.clear
                },
                updateBidTimes: (state, payload) => {
                    state.bidTimes = payload.bidTimes
                },
                updateUser: (state, payload) => {
                    state.user = payload.user
                },
                updatePhone: (state, payload) => {
                    console.log(state, payload)
                    if (state.user) {
                        console.log("pre:" + state.user.phone)
                        state.user.phone = payload.phone
                        console.log("afte:" + state.user.phone)

                    }
                },

                saveUser: (state, payload) => {
                    state.user = payload.user
                    wx.setStorageSync("user", JSON.stringify(state.user))
                },
                saveToken: (state, payload) => {
                    state.token = payload.token
                    wx.setStorageSync("token", payload.token)
                },
                saveOpenid: (state, payload) => {
                    state.openid = payload.openid
                    wx.setStorageSync("openid", payload.openid)
                },
                saveSession: (state, payload) => {
                    state.session = payload.session;
                    wx.setStorageSync("session", payload.session)
                },
                saveUserRole: (state, payload) => {
                    state.role = payload.role;
                    wx.setStorageSync("role", payload.role)
                },

                removeToken: (state, payload) => {
                    state.token = null
                    wx.removeStorageSync("token")
                },
                removeUser: (state, payload) => {
                    state.user = null
                    wx.removeStorageSync("user")
                },
                removeOpenid: (state, payload) => {
                    state.openid = null
                    wx.removeStorageSync("openid")
                },
                removeSession: (state, payload) => {
                    state.session = null
                    wx.removeStorageSync("session")
                },
                saveParamToken: (state, payload) => {
                    state.paramtoken = payload.paramtoken
                    wx.setStorageSync("paramtoken", payload.paramtoken)
                },
                saveUserStatus: (state, payload) => {
                    state.userStatus = payload.userStatus
                    wx.setStorageSync("userStatus", payload.userStatus)
                },
                saveUserStatusExpire: (state, payload) => {
                    state.userStatusExpire = payload.userStatusExpire
                    wx.setStorageSync("userStatusExpire", payload.userStatusExpire)
                },
                updateCert: (state, payload) => {
                    state.certs.push(payload.cert)
                },
                removeCertAtIndex: (state, payload) => {
                    state.certs.splice(payload.index, 1)
                },
                removeAll: (state, payload) => {
                    state.certs = []
                }
            },
            actions: {
                updateProvince({ commit }) {
                    api.loadProvince().then(res => {
                        let provinces = res.body.map(item => {
                            item.text = item.simple_name;
                            item.value = item.simple_name == "全国" ? "" : item.id;
                            item.shortName = item.simple_name == "全国" ? "" : item.province_simple;
                            return item
                        })
                        commit("updateProvince", { provinces: provinces })
                    })
                },
                updateBidTimes({ commit }) {
                    api.loadBidTime().then(data => {
                        data.splice(0, 0, { code: "", value: "全部" });
                        commit("updateBidTimes", { bidTimes: data })
                    })
                },
                loginAction({ commit }) {

                },
                clearSession({ commit }) {
                    commit("removeToken")
                    commit("removeUser")
                    wx.removeStorageSync("expire");
                    wx.removeStorageSync("openid");
                    wx.removeStorageSync("session")
                },
                showBind(context) {
                    let showModal = context.state.showModal
                    if (!showModal) {
                        wx.showModal({
                            content: "为了您的账号安全，请绑定手机后继续使用",
                            cancelText: "关闭",
                            confirmText: "去绑定",
                            success: (res) => {
                                if (res.confirm) {
                                    utils.checkLogin().then(res => {
                                        wx.navigateTo({
                                            url: "/pages/my/register/main"
                                        })
                                    })
                                }
                            }
                        })
                    }
                },

                showLimit(context) {
                    let showModal = context.state.showModal
                    if (!showModal) {
                        wx.showModal({
                            content: "访问过快，请稍后再试",
                            showCancel: false,
                            success: () => {
                                context.commit('updateShowModal', { showModal: false })
                                wx.navigateBack()
                            }
                        })
                    }
                }
            },
            strict: debug
            // plugins: debug ? [createLogger()] : []
        })
        Vue.prototype.$store = store
    }
})
export default store
