const cookieController = {};
cookieController.setCookie = setCookie;

function setCookie(req, res, next) {
  res.cookie('secret', Math.floor(Math.random() * 99));
  next();
}

module.exports = cookieController;