import express from "express";
import { validateResource } from "../middleware/validateResource";
import { requireUser } from "../middleware/requireUser";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEvent,
  getEvents,
  saveEvent,
} from "../controller/event.controller";
import {
  createEventValidator,
  editEventValidator,
  getEventsValidator,
  getEventValidator,
} from "../lib/validators/eventValidator";
import { rateLimit } from "../middleware/rateLimiter";
const router = express.Router();

router.post("/", [rateLimit, validateResource(getEventsValidator)], getEvents);
router.post(
  "/create",
  [requireUser, validateResource(createEventValidator)],
  createEvent
);
router.post(
  "/save/:eventId",
  [requireUser, validateResource(getEventValidator)],
  saveEvent
);
router.post("/:eventId", getEvent);
// router.post("/:eventId", validateResource(getEventValidator), getEvent);
router.put(
  "/:eventId",
  [requireUser, validateResource(editEventValidator)],
  editEvent
);
router.delete(
  "/:eventId",
  [requireUser, validateResource(getEventValidator)],
  deleteEvent
);

export default router;
