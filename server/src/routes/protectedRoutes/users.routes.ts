import express, { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import auth from "../../middleware/auth.middleware";

const router: Router = express.Router();

router.get("/logged-in-user", auth.isAuthenticated, AuthController.userProfile);
router.get("/get-all-users", auth.isAuthenticated, AuthController.getAllUser);

export default router;
