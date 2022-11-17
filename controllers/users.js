const User = require("../models/user");

module.exports.register = (req, res) => {
  res.render("users/register");
}

module.exports.store = async (req, res, next) => {
  try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Welcome to yelpCamp!");
          res.redirect("/campgrounds");
      });
  } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
  }
}

module.exports.login = (req, res) => {
  res.render("users/login");
}

module.exports.loginStore = (req, res) => {
  req.flash("success", "Welcome back again!");
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout(function (err) {
      if (err) {
          return next(err);
      }
      req.flash("success", "Goodbye!");
      res.redirect("/login");
  });
}