const {Router} = require("express");
const authController = require("../controller/auth.controller");
const authRouter = Router();
const middleware = require("../middleware/auth.middleware");
// authRouter.post("/register", (req, res) => {
//     res.send("Register");
// });

authRouter.post("/register", authController.registerUserController);

authRouter.post("/login", authController.loginUserController);

authRouter.get("/logout", authController.logoutUserController);

authRouter.get("/get-me", middleware.authUser, authController.getMeController);

module.exports = authRouter;

