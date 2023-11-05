const router = require("express").Router();

const { User } = require("../../models");
const { isLoggedIn, authenticate } = require("../helpers");

router.post("/register", isLoggedIn, async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user_id = user_id;

    res.json(user);
  } catch (err) {
    const code = err.code;
    const errors = [];

    if (code === 11000) {
      return res
        .status(403)
        .send({ message: "That email address is already in use" });
    }

    for (let prop in err.errors) {
      const txt = err.errors[prop].message;

      errors.push(txt);
    }

    res.status(403).send({
      message: "Authentication error",
      errors,
    });
  }
});

router.post("/login", isLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).send({
        message: "that user does not exist...uh-oh",
      });
    }
    const pass_is_valid = await user.validatePass(password);

    if (!pass_is_valid)
      return res.status(401).send({
        message: "Password is incorrect",
      });

    req.session.user_id = user_id;
    res.json(user);

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get('/authenticate', authenticate, (req, res) => {
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.session.destroy();

    res.json({
        message: 'Logged out'
    });
});

module.exports = router;