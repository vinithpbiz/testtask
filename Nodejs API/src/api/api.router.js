const router = require("express").Router();

router.use("/", require("./user/user.versions"));


module.exports = router;
