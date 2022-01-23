const router = require("express").Router()
const ctrl = require("../controllers/videogames.controllers")


router.route("/")
  .get(ctrl.list)
  .post(ctrl.create)

router.route("/:id")
  .delete(ctrl.remove)
  .get(ctrl.getVideoGameByID)

router.route("/image/:id")
  .get(ctrl.getImage)


module.exports = router
