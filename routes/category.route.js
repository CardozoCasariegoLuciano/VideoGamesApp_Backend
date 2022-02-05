const router = require("express").Router()
const ctrl = require("../controllers/category.controller")
const {categoryByID} = require("../middlewares/getByID")
const {isLogin} = require("../middlewares/islogin")

router.route("/")
  .post(isLogin, ctrl.create)
  .get(ctrl.list)

router.route("/:categoryID")
  .get(ctrl.getByID)
  .delete(isLogin, ctrl.remove)

router.param("categoryID", categoryByID)

module.exports = router
