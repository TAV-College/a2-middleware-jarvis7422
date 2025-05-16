const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { createUser,grantPermission } = require("../models/user.model");
const {getUserByUsername} = require("../models/user.model")
const {generateToken} = require("../controllers/users.controller")
const {
  encryptPassword,
  validateUser,
} = require("../controllers/users.controller");


router.post("/user", async (req, res) => {
  const username = req.body?.username;
  const password1 = req.body?.password1;
  const password2 = req.body?.password2;
  let errorMsg = "";

  if (!username) {
    errorMsg += "Missing Username\n";
  }

  if (!password1 || !password2) {
    errorMsg += "Missing Password\n";
  }

  if (password1 !== password2) {
    errorMsg += "Password Mismatch";
  }

  if (errorMsg) {
    req.errorMsg = errorMsg;
    res.redirect("/signup");
  } else {
    const password = await encryptPassword(password1);
    await createUser({ username, password });
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login" });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await validateUser(username, password);
  if (user) {
    await grantPermission(username);
    const updatedUser = await getUserByUsername(username); 
    const token = generateToken(updatedUser.username);    

  res.clearCookie("authCookie");
  res.cookie("authCookie", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res.render("profile", {
    title: `${updatedUser.username}'s Profile`,
    user: updatedUser,
})}
});


router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup" });
});

router.get("/profile", verifyToken, (req, res) => {

  if (req.user.permissions === 1) {
    res.render("profile", {
      title: `${req.user.username}'s Profile`,
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("authCookie");
});


module.exports = router;
