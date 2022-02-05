const router = require("express").Router()
const authctrl = require("../controllers/auth.controllers")

router.route("/login")
  .post(authctrl.login)

router.route("/register")
  .post(authctrl.register)

router.route("/logout")
  .post(authctrl.logout)

module.exports = router
