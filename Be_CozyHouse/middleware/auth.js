const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const ERROR = require('../types/error');

const authMiddleware = (option = { optional: false }) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, tokenPayload) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, err: ERROR.INVALID_TOKEN });
      }
      const user = await User.findOne({
        username: tokenPayload.username,
      }).select(['-hash', '-salt']);
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).json({ success: false, err: ERROR.AUTH_REQUIRED });
      }
    });
  } else {
    if (option.optional) {
      next();
    } else {
      res.status(401).json({ success: false, err: ERROR.AUTH_REQUIRED });
    }
  }
};

module.exports = authMiddleware;
