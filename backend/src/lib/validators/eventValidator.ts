import {
  array,
  boolean,
  date,
  number,
  object,
  string,
  TypeOf,
  union,
} from "zod";

export const getEventsValidator = object({
  body: object({
    name: string().optional(),
    category: string().optional(),
    location: string({ required_error: "Location is required." }),
    venue: string().optional(),
    date: union([string(), date()]).optional(),
    isTopEvents: boolean().optional(),
    pageParam: string().optional(),
  }),
});

export const createEventValidator = object({
  body: object({
    name: string({ required_error: "Event name is required." }),
    images: array(string({ required_error: "Event image is required." })),
    description: string({ required_error: "Event description is required." }),
    category: string({ required_error: "Event category is required." }),
    additionalInfo: string().optional(),
    location: string({ required_error: "Event location is required." }),
    venues: array(string({ required_error: "Event venue is required." })),
    priceRange: object({
      min: number({ required_error: "Minimum price number is required." }),
      max: number({ required_error: "Maximum price number is required." }),
      currency: string({ required_error: "Currency is required." }),
    }),
    dates: object({
      start: date({ required_error: "Event start date is required." }),
      end: date().optional(),
    }),
    sales: object({
      public: object({
        start: date({ required_error: "Event sales start date is required." }),
        end: date().optional(),
      }),
      presales: array(
        object({
          start: date().optional(),
          end: date().optional(),
        })
      ).optional(),
    }),
    promoters: array(string()).optional(),
    seatmap: string().optional(),
  }),
});

export const editEventValidator = object({
  body: object({
    name: string({ required_error: "Event name is required." }),
    images: array(string({ required_error: "Event image is required." })),
    description: string({ required_error: "Event description is required." }),
    category: string({ required_error: "Event category is required." }),
    additionalInfo: string().optional(),
    location: string({ required_error: "Event location is required." }),
    venues: array(string({ required_error: "Event venue is required." })),
    priceRange: object({
      min: number({ required_error: "Minimum price number is required." }),
      max: number({ required_error: "Maximum price number is required." }),
      currency: string({ required_error: "Currency is required." }),
    }),
    dates: object({
      start: date({ required_error: "Event start date is required." }),
      end: date().optional(),
    }),
    sales: object({
      public: object({
        start: date({ required_error: "Event sales start date is required." }),
        end: date().optional(),
      }),
      presales: array(
        object({
          start: date().optional(),
          end: date().optional(),
        })
      ).optional(),
    }),
    promoters: array(string()).optional(),
    seatmap: string().optional(),
  }),
  params: object({
    eventId: string({
      required_error: "Event id is required.",
    }),
  }),
});

export const getEventValidator = object({
  params: object({
    eventId: string({ required_error: "Event id is required." }),
  }),
  body: object({
    location: string({ required_error: "Event location is required." }),
  }),
});

export type GetEventsRequest = TypeOf<typeof getEventsValidator>;
export type CreateEventRequest = TypeOf<typeof createEventValidator>;
export type EditEventRequest = TypeOf<typeof editEventValidator>;
export type GetEventRequest = TypeOf<typeof getEventValidator>;
