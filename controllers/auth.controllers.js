const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return email.match(re);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userloged = await User.findOne({ email });

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "No valid Email",
      });
    }

    const validLogin =
      userloged && (await User.comparePasswords(password, userloged.password));

    if (!validLogin) {
      return res.status(400).json({ message: "Wrong email or password" });
    }


    const jwToken = jwt.sign(
      {
        data: {
          name: userloged.name,
          email: userloged.email,
          id: userloged._id,
          role: userloged.role,
        },
      },
      config.JWT_SECRET
    );


    //persistir el token en una cooki con tiempo de expiracion
    res.cookie("tkn", jwToken, { expire: new Date() + 9999 });


    return res.json({
      token: jwToken,
      user: {
        name: userloged.name,
        email: userloged.email,
        roles: userloged.role,
        inventory: userloged.inventory,
        id: userloged._id,
      },
    });
  } catch (err) {
    console.log({err})
    return res.status(400).json("Something went wrong");
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, repitedPassword } = req.body;

    const isUsed = await User.findOne({ email });
    if (isUsed) {
      return res.status(400).json({
        message: "That mail is already used",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "No valid Email",
      });
    }

    if (password != repitedPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const newUser = await new User({
      name,
      email,
      password: await User.encriptPassword(password),
    });

    await newUser.save();

    return res.json(newUser);
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("tkn");
    res.json({ message: "Singout success" });
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};
