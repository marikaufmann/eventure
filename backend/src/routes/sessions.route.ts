import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";
import {
  createSessionHandler,
  deleteSessionHandler,
  getCurrentSessionHandler,
  getSessionsHandler,
  googleOauthHandler,
} from "../controller/session.controller";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import { createSessionValidator } from "../lib/validators/sessionValidator";
const router = express.Router();
router.post(
  "/",
  validateResource(createSessionValidator),
  createSessionHandler
);
router.get("/", requireUser, getSessionsHandler);
router.delete("/", requireUser, deleteSessionHandler);
router.get("/validate-session", requireUser, getCurrentSessionHandler);
router.get("/oauth/google/", googleOauthHandler);
export default router;
