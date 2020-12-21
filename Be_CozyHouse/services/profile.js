const { User } = require('../models/user.js');

const updateMe = async (username, payload) => {
  const user = await User.findOneAndUpdate({ username: username }, payload, {
    new: true,
  });
  return user;
};

module.exports = { updateMe };
