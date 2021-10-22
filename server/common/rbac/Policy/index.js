const roles = require("../../enum/roles");
const adminPolicy = require("./adminPolicy");
const guestPolicy = require("./guestPolicy");

const opts = {
  [roles.ADMIN]: {
    can: adminPolicy,
  },
  [roles.GUEST]: {
    can: guestPolicy,
  },
};

module.exports = opts;
