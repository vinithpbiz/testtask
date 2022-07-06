module.exports = (res, isSuccess, data, code) => {
  return res.status(code).send({
    success: isSuccess,
    data: data,
  });
};
