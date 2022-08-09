module.exports = async (args, db, openId, ctx) => {
  let res = await db
    .collection("test-form")
    .where({
      groupId: args.groupId,
    })
    .get();
  let form = res.data.find((item) => item._openid === openId);
  if (!form) {
    throw Error("Not your group");
  }
  return {
    success: true,
    userList: res.data,
    isLeader: form.isLeader,
  };
};
