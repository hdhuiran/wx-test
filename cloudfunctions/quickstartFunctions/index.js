const getOpenId = require("./getOpenId/index");
const createGroup = require("./createGroup.js");
const getManyGroup = require("./getManyGroup.js");
const joinGroup = require("./joinGroup.js");
const getManyForm = require("./getManyForm.js");

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "getOpenId":
      return await getOpenId.main(event, context);
    case "createGroup":
      return await createGroup(event, context);
    case "getManyGroup":
      return await getManyGroup(event, context);
    case "joinGroup":
      return await joinGroup(event, context);
    case "getManyForm":
      return await getManyForm(event, context);
  }
};
