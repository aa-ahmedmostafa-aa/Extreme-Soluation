const RBAC = require("easy-rbac");
const opts = require("./Policy");
const rbac = RBAC.create(opts);

module.exports = rbac;
