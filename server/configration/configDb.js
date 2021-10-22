const mongoose = require("mongoose");

const connection = () =>
  mongoose
    .connect(process.env.CONNECTION_STRING_DEPLOY)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

module.exports = connection;
