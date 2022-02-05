const router = require("express").Router()
const ctrl = require("../controllers/videogames.controllers")
const {videogameByID} = require("../middlewares/getByID")
const {isLogin} = require("../middlewares/islogin")


router.route("/")
  .get(ctrl.list)
  .post(isLogin, ctrl.create)

router.route("/:videogameID")
  .delete(isLogin, ctrl.remove)
  .get(ctrl.getOneVideoGame)

router.route("/image/:videogameID")
  .get(ctrl.getImage)


router.param("videogameID", videogameByID)

module.exports = router
