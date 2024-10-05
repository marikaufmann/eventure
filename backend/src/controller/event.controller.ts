import { Request, Response } from "express";
import {
  CreateEventRequest,
  EditEventRequest,
  GetEventRequest,
  GetEventsRequest,
} from "../lib/validators/eventValidator";
import { fetchAndCacheEvents, findEvent } from "../service/event.service";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const response = await fetchAndCacheEvents(req.body);
    res.status(200).json(response);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const createEvent = async (
  req: Request<{}, {}, CreateEventRequest["body"]>,
  res: Response
) => {
  try {
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const getEvent = async (
  req: Request<GetEventRequest["params"], {}, GetEventRequest["body"]>,
  res: Response
) => {
  try {
    const { location } = req.body;
    const eventId = req.params.eventId;
    const event = await findEvent({ location, eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.status(200).json(event);
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const editEvent = async (
  req: Request<{}, {}, EditEventRequest["body"]>,
  res: Response
) => {
  try {
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const deleteEvent = async (
  req: Request<GetEventRequest["params"]>,
  res: Response
) => {
  try {
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

export const saveEvent = async (
  req: Request<GetEventRequest["params"]>,
  res: Response
) => {
  try {
    const eventId = req.params.eventId;
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};
