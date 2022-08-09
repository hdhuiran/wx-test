import cf from "../../utils/cf";
Page({
  data: {
    user: {},
    course: "从零开始", //当前课程
    lesson: {
      id: "001-001", //章节ID
      title: "编程的本质", //标题
      summary: "由浅入深", //摘要
      homework: "作业", //作业
    },
  },
  onLoad: function (params) {},
  onShow: function (params) {
    let time = wx.getStorageSync("getUserAt");
    if (time) {
      let now = Date.now();
      if (now - time < 36000000) {
        let user = wx.getStorageSync("user");
        if (user) {
          this.setData({
            user: user,
            course: user.course,
            lesson: user.lesson,
          });
          return;
        }
      }
    }
    cf("getUser", {}).then((user) => {
      if (user) {
        this.setData({
          user: user,
          course: user.course,
          lesson: user.lesson,
        });
        wx.setStorageSync("user", user);
        wx.setStorageSync("getUser", Date.now());
      }
    });
  },
});
