let cloud = require("wx-server-sdk");
// const getOpenId = require("./getOpenId/index");
let files = require("./apis.js");
let Fun = {};
files.map((filename) => {
  let name = filename.replace(".js", "");
  Object.defineProperty(Fun, name, {
    value: require("./functions/" + filename),
  });
});
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let wxContext = cloud.getWXContext();
    if (typeof Fun[event.api] !== "function") {
      throw Error("np api");
    }
    return await Fun[event.api](event.args, db, wxContext.OPENID, {
      cloud,
      appId: wxContext.APPID,
      unionId: wxContext.UNIONID,
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errorMessage: error.message,
    };
  }
};
