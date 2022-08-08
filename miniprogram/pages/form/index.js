Page({
  data: {
    date: "",
    region: "",
    groupId: "",
  },
  onLoad: function (e) {
    if (e.groupId) {
      this.setData({ groupId: e.groupId });
    }
  },
  submit: function (e) {
    // 防止用户反复点击提交按钮
    if (this.data.loading) {
      return;
    }
    this.setData({
      loading: true,
    });
    wx.showLoading({});
    let u = e.detail.value;
    // 判断是加入小组还是创建小组
    if (this.data.groupId) {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "joinGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
              groupId: Number(this.data.groupId),
            },
          },
        })
        .then((res) => {
          this.setData({
            loading: false,
          });
          wx.hideLoading();
          if (res.result.success) {
            // wx.setStorageSync("groupId", this.data.groupId);
            wx.redirectTo({
              url:
                "/pages/tip/index?groupId=" +
                this.data.groupId +
                "&code=" +
                res.result.code,
            });
          } else {
            wx.showModal({
              title: "提示",
              content: res.result.errorMessage,
              success: function () {
                wx.navigateBack({
                  delta: 1,
                });
              },
            });
          }
        });
    } else {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "createGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
            },
          },
        })
        .then((res) => {
          console.log(res);
          //   本地缓存
          wx.setStorageSync("groupId", res.result.groupId);
          this.setData({
            loading: false,
          });
          wx.hideLoading();
          wx.redirectTo({
            url: "/pages/tip/index?groupId=" + String(res.result.groupId),
          });
        });
    }
  },

  dateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  regionChange: function (e) {
    this.setData({
      region: e.detail.value,
    });
  },
});
