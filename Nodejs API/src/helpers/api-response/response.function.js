const response = require("./response.format");

const successResponse = (res, data) => {
  return response(res, true, data || "Ok", 200);
};

const notFoundResponse = (res, data) => {
  return response(res, false, data || "Not Found", 404);
};

const internalFailureResponse = (res, data) => {
  return response(res, false,  data || "internal failur", 500);
};

const authFailureResponse = (res,  data) => {
  return response(res, false, data || "authentication failure", 401);
};

const badRequestResponse = (res, data) => {
  return response(res, false, data || "bad request", 400)
}

module.exports = {
  successResponse,
  internalFailureResponse,
  authFailureResponse,
  notFoundResponse,
  badRequestResponse
};
