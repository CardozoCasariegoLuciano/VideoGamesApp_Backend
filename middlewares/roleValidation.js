exports.roleValidation = async (req, res, next) => {
  try {

    user = req.user;

    if (user.role == 0) {
      return res.status(401).json({ Message: "Don't have permissions" });
    }

    next();
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};
