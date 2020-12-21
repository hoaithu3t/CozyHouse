const router = require('express').Router();
const authMdw = require('../middleware/auth');
const { updateMe } = require('../services/profile');

router.get('/', authMdw(), (req, res) => {
  res.json({ user: req.user, token: req.token });
});

router.put('/', authMdw(), (req, res) => {
  updateMe(req.user.username, req.body).then((user) => {
    res.json(user);
  });
});

module.exports = router;
