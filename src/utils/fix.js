let fixComponentData = {
    onHide() {
        const pages = getCurrentPages()
        // onHide（页面离开）时，存储当前页面状态
        // 触发条件：分享消息 -> A(onHide) -> B
        // if (pages.length === 1 && last(pages).route !== 'pages/index/main') {
        //     // 此处专为解决 分享或消息推送链接 进入时触发的bug，所以加条件判定
        //     this.$options._pagesStore[this._uid] = {...this.$data}
        // }
    },
    onLaunch () {
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          console.log('onCheckForUpdate====', res)
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            console.log('res.hasUpdate====')
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: '更新提示',
                content: '',
                showCancel: false,
                confirmText: '新功能上线，点我立即体验',
                success: function (res) {
                  console.log('success====', res)
                  // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                  }
                }
              })
            })
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
              })
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    onLoad() {
        // 页面重复打开时不会执行data
        // 如果有缓存值则需要使用组件默认data覆盖，因为该面在onUnload中被使用了缓存值
        // 触发条件：分享消息 -> A -> B -> A(onLoad)
        if (
            typeof this.$options.data === 'function'
            && this.$options._pagesStore[this._uid]
        ) {
            Object.assign(this.$data, this.$options.data())
        }
    },
    onUnload() {
        if (typeof this.$options.data === 'function') {
            // 在页面的`onUnload`钩子执行之后，再执行清理，保证页面的`onUnload`能正确获取组件状态
            setTimeout(() => {
                // 1.1 解决组件退出后，状态不重置的bug
                // 1.2 小心！下一行代码是在页面推出的时候执行，某些环境状态和组件初始时可能不同了
                // 1.3 例如页面栈（getCurrentPages），初始化时比推出时多一个
                // 1.4 组件 data只给定初始值，不要依赖外部状态，如果组件状态与外部相关，请在对应钩子中赋值
                // 2.1 如果页面有缓存值，则使用缓存值重置 解决单个页面被重复打开(分享链接进入)出现的bug
                // 2.2 https://github.com/Meituan-Dianping/mpvue/issues/140#issuecomment-380145031
                // 触发条件：分享消息 -> A -> B -> A(onLoad) -< B
              if (this.$data ) {
                Object.assign(this.$data, this.$options._pagesStore[this._uid] || this.$options.data())
              }
            }, 0)
        }
    },
    onShareAppMessage() {
        return {
            title:"淘班班-淘优选劳务",
            path:"/pages/page/index"
        }
    },
};
export default fixComponentData