import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";
import { requireUser } from "../middleware/requireUser";
import { validateResource } from "../middleware/validateResource";
import {
  createUserValidator,
  deleteUserValidator,
  editUserValidator,
} from "../lib/validators/userValidator";
const router = express.Router();
router.post("/", validateResource(createUserValidator), createUserHandler);
router.get("/me", requireUser, getCurrentUserHandler);
router.put(
  "/:userId",
  [requireUser, validateResource(editUserValidator)],
  editUserHandler
);
router.delete(
  "/",
  [requireUser, validateResource(deleteUserValidator)],
  deleteUserHandler
);
export default router;
