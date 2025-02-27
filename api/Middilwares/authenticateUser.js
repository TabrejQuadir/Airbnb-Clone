const jwt = require('jsonwebtoken');
// const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fmdafsgjhhjgfhs";

async function authenticate(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.userData = userData;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticate;