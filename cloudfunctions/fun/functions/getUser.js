module.exports = async (args, db, openId, ctx) => {
  let user = await db.collection("user").doc(openId).get();
  if (user.data) {
    return user.data;
  }

  let data = {
    _id: openId, //默认ID
    name: "", //名字
    bio: "", //简介
    avatar: "", //头像
    createdAt: new Date(), //注册时间
    ban: false, //封禁
    share: 20, //贡献
    coin: 0, //金币
    score: 0, //分数
    codeLevel: 0, //等级
    role: [], //角色
    course: "从零开始", //当前课程
    lesson: {
      id: "001-001", //章节ID
      title: "编程的本质", //标题
      summary: "由浅入深", //摘要
      homework: "作业", //作业
    },
  };
  await db.collection("user").add({ data });
  return data;
};
