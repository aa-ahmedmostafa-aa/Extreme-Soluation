const {
  getAllUsersController,
  addNewUserController,
  signInController,
} = require("../controller/user.controller");

const router = require("express").Router();
const validateRequest = require("../../../common/middelware/validateRequest");
const isAuhoraized = require("../../../common/middelware/isAuthoraized");
const { addUserSchema, signInSchema } = require("../joi/userValidation");
const { GET_ALL_USER } = require("../endPoints");

//*** user Routes */
router.get("/users", isAuhoraized(GET_ALL_USER), getAllUsersController);
router.post("/addUser", validateRequest(addUserSchema), addNewUserController);
router.post("/signIn", validateRequest(signInSchema), signInController);

module.exports = router;
