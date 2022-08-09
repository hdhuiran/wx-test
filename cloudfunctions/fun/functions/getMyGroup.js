module.exports = async (args, db, openId, ctx) => {
  let res = await db
    .collection("test-form")
    .where({
      _openid: openId,
    })
    .get();
  return {
    success: true,
    groupId: res.data[0] ? res.data[0].groupId : "",
  };
};
