export default async function (api, args, withLoading) {
  try {
    if (withLoading) {
      wx.showLoading({});
    }
    let res = await wx.cloud.callFunction({
      name: "fun",
      data: {
        api,
        args,
      },
    });
    if (withLoading) {
      wx.hideLoading({});
    }
    if (res.result.success === false) {
      console.error(res);
      wx.showModal({
        title: "操作错误",
        content: res.errorMessage,
      });
      return false;
    } else {
      return res.date;
    }
  } catch (error) {
    console.error(e);
    if (withLoading) {
      wx.hideLoading();
    }
    wx.showModal({
      title: "网络错误",
      content: e.message,
    });
    return false;
  }
}
