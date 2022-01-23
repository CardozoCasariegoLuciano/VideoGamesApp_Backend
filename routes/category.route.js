const router = require("express").Router()
const ctrl = require("../controllers/category.controller")

router.route("/")
  .post(ctrl.create)
  .get(ctrl.list)

router.route("/:id")
  .get(ctrl.getByID)
  .delete(ctrl.remove)

module.exports = router
