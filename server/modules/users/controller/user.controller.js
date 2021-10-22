const User = require("../Model/user.model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ** Get All Users **//
const getAllUsersController = async (req, res) => {
  let { page, size } = req.query;
  try {
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const all = await User.countDocuments();
    const totalPage = Math.ceil(all / limit);
    const users = await User.find({})
      .select("-password")
      .limit(limit)
      .skip(skip);
    res
      .status(StatusCodes.OK)
      .json({ message: "success", page, size, totalPage, data: users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "err", error });
  }
};
// ** End Get All Users **//

// ** For Add New User **//
const addNewUserController = async (req, res) => {
  let { userName, password, phoneNumber, role } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User Name is already exist" });
    } else {
      let customer = new User({
        userName,
        password,
        phoneNumber,
        role,
      });
      const user = await customer.save();
      const userCreated = await User.findOne({ _id: user._id }).select(
        "-password"
      );

      res
        .status(StatusCodes.CREATED)
        .json({ message: "registerd success", user: userCreated });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
};
// ** End  Add New User **//

// ** Start  SignIn Controller **//

const signInController = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User is not found" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.SECRET_KEY
        );

        res.status(StatusCodes.OK).json({
          message: "success",
          token,
          user: {
            userName: user.userName,
            _id: user._id,
            role: user.role,
          },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "password is not correct" });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
// ** End  SignIn Controller **//

module.exports = {
  getAllUsersController,
  addNewUserController,
  signInController,
};
