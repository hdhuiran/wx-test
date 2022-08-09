import cf from "../../utils/cf";
Page({
  data: {
    groupId: "",
  },
  onLoad: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    } else {
      cf("getMyGroup", {}).then((res) => {
        if (res.groupId) {
          wx.setStorageSync("groupId", res.groupId);
          this.setData({
            groupId: res.result.groupId,
          });
        }
      });
    }
  },
  onShow: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    }
  },
});
