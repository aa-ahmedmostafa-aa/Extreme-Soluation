const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");
const { StatusCodes } = require("http-status-codes");
const User = require("../../modules/users/Model/user.model");

module.exports = (endPoint) => {
  return async (req, res, next) => {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
      ) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
        return;
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
        return;
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.find({ _id: decoded._id });
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
        return;
      } else {
        req.user = decoded;
        try {
          const isAllowed = await rbac.can(req.user.role, endPoint);
          if (isAllowed) {
            next();
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: "UNAUTHORIZED" });
          }
        } catch (error) {
          res.json({ error });
        }
      }
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED frist" });
    }
  };
};
