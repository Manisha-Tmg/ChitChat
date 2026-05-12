import express, { Router } from "express";
import { userProfileServices } from "../../services/auth.service";
import auth from "../../middleware/auth.middleware";
import AuthController from "../../controllers/auth.controller";

const router: Router = express.Router();

router.get("/logged-in-user", auth.isAuthenticated, AuthController.userProfile);
router.get("/get-all-users", auth.isAuthenticated, AuthController.getAllUser);

export default router;
