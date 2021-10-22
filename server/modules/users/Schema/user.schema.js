const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    role: { type: String, default: "guest" },
  },
  {
    timestamps: true,
  }
);

//** hook to hash passsword befor save */
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

module.exports = userSchema;
