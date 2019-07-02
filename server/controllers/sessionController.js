const jwt = require('jsonwebtoken');
const sessionController = {};

sessionController.createJwt = (req, res, next) => {
  const token = jwt.sign({
    signedIn: true,
  }, 'secret', { expiresIn: 60 * 60 });
  res.cookie('jwt', token);
  res.redirect('/isLoggedin');
};

sessionController.checkJwt = (req, res, next) => {
  if (req.cookies.jwt === undefined)
    return res.redirect('/signup')
  jwt.verify(req.cookies.jwt, 'secret', (err, decoded) => {
    if (err) return res.redirect('/signup');
    if (decoded.signIn)
      return next();
    else
      return res.redirect('/signup')
  });
};

module.exports = sessionController;