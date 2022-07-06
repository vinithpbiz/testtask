const router = require("express").Router();
const controller = require("./user.controller");
const {virifyaccesstoken} = require('../../../middelware/auth.middelware') 

router.post("/register", controller.register);
router.post("/addrole", controller.addrole);
router.get("/users",virifyaccesstoken, controller.getuser);
router.get("/users/role/count",virifyaccesstoken, controller.searchuser);
router.post("/login", controller.login);


module.exports = router;
