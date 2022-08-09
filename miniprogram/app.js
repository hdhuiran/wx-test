// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      wx.updateWeChatApp({});
    } else {
      let info = wx.getAccountInfoSync();
      wx.cloud.init({
        // env:
        //   info.miniProgram.envVersion === "release"
        //     ? "cloud1-2gwnfczh6cc52b6a"
        //     : "test-0g483vy600dcfd55",
        traceUser: true,
      });
    }
    let updateManger = wx.getUpdateManager();
    updateManger.onCheckForUpdate(function (res) {});
    updateManger.onUpdateReady(function () {
      wx.showModal({
        titl: "更新提示",
        content: "新版本已经准备好，是否重启？",
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
  },
  // 全局数据 可在所有页面用getApp（）访问到这个对象
  globalData: {},
});
