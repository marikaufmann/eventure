import axios from "axios";
import { redis, ticketmasterRateLimit } from "../middleware/rateLimiter";
import { countryCodes } from "../config/countryCodes";
import { FetchedEventType } from "../shared/types";
import { GetEventsRequest } from "../lib/validators/eventValidator";

interface Params {
  city: string;
  countryCode: string;
  size: number;
  classificationName?: string;
  startDateTime?: string;
  endDateTime?: string;
  page?: string;
}

const TTL = 86400;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 768;

export const fetchAndCacheEvents = async (body: GetEventsRequest["body"]) => {
  const { location, category, date, isTopEvents, pageParam } = body;

  const city = location.split(", ")[0];
  const countryCode = countryCodes.find(
    (country) => country.name === location.split(", ")[1]
  )?.countryCode as string;

  const cacheKey = `events_${encodeURIComponent(location)}${
    category ? `_${encodeURIComponent(category)}` : ""
  }${
    date
      ? `_${
          (typeof date === "string" ? new Date(date) : date)
            .toISOString()
            .split("T")[0]
        }`
      : ""
  }`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    let { events, pageCount } = JSON.parse(cachedData);
    if (isTopEvents) {
      if (category) {
        return events.slice(0, 6);
      }
      return events.slice(0, 8);
    } else {

      const pageSize = 10;
      
      if (events.length < 10) {
        return {
          events,
          hasMore: false,
        };
      } else if (Number(pageParam) * pageSize <= events.length) {
        return {
          events: events.slice(
            (Number(pageParam) - 1) * pageSize,
            Number(pageParam) * pageSize
          ),
          hasMore: true,
        };
      } else {
        let currentPage = pageCount + 1;
        let iterationCount = 0;
        let hasMore = true;
        const initialEventsCount = events.length;
        let uniqueEvents: FetchedEventType[] = [];
        const eventIds: Set<string> = new Set();
        const eventNames: Set<string> = new Set();

        while (uniqueEvents.length < pageSize && hasMore === true) {
          const params: Params = {
            city,
            countryCode,
            size: 200,
            page: currentPage.toString(),
          };

          if (category) {
            params.classificationName = category;
          }
          if (date) {
            const dateObj = new Date(date);
            const dateString = dateObj.toISOString().split("T")[0];
            params.startDateTime = `${dateString}T00:00:00Z`;
            params.endDateTime = `${dateString}T23:59:59Z`;
          }
          const key = `ticketmaster_rate_limit_${city}_${countryCode}_${
            (category && encodeURIComponent(category)) || "all"
          }${
            date
              ? `_${
                  (typeof date === "string" ? new Date(date) : date)
                    .toISOString()
                    .split("T")[0]
                }`
              : "any"
          }`;

          const allowed = await ticketmasterRateLimit(key);
          if (!allowed) {
            throw new Error("Rate limit exceeded");
          }
          const response = await axios.get(
            "https://app.ticketmaster.com/discovery/v2/events.json",
            {
              params: {
                ...params,
                apikey: process.env.TICKETMASTER_API_KEY,
              },
            }
          );

          const eventData = response.data._embedded?.events;
          if (!eventData || eventData.length === 0) {
            hasMore = false;
            break;
          }

          const data = eventData.map(transformTicketmasterEvent);

          for (const event of data) {
            const similarEvents = events.filter(
              (uniqueEvent: FetchedEventType) =>
                isSimilarEvent(uniqueEvent, event)
            );
            if (similarEvents.length > 0) {
              if (!containsKeywords(event.name)) {

                events = events.filter(
                  (uniqueEvent: FetchedEventType) =>
                    !isSimilarEvent(uniqueEvent, event)
                );
                events.push(event);
              } else {

                events = events.filter(
                  (uniqueEvent: FetchedEventType) =>
                    !isSimilarEvent(uniqueEvent, event)
                );
                const preferredEvent = similarEvents.find(
                  (similarEvent: FetchedEventType) =>
                    !containsKeywords(similarEvent.name)
                );
                if (preferredEvent) {
                  events.push(preferredEvent);
                }
              }
            } else if (!eventIds.has(event.id) && !eventNames.has(event.name)) {

              if (!containsKeywords(event.name)) {
                events.push(event);
                uniqueEvents.push(event);
              }
              eventIds.add(event.id);
              eventNames.add(event.name);
            }
          }

          currentPage += 1;
          iterationCount += 1;
          if (iterationCount > 3 && uniqueEvents.length < 5) {
            hasMore = false;
            break;
          }

          if (data.length < 200) {
            hasMore = false;
            break;
          }
        }
        await redis.set(
          cacheKey,
          JSON.stringify({
            events,
            pageCount: currentPage - 1,
          }),
          "EX",
          TTL
        );

        const response = {
          events: events.slice(
            (Number(pageParam) - 1) * pageSize,
            events.length
          ),
          hasMore,
        };
        return response;
      }
    }
  }

  const targetEventCount = category ? 6 : 8;
  let currentPage = 0;
  let iterationCount = 0;

  if (isTopEvents) {
    const MAX_ITERATIONS = 1;
    let uniqueEvents: FetchedEventType[] = [];
    const eventIds: Set<string> = new Set();
    const eventNames: Set<string> = new Set();

    while (
      uniqueEvents.length < targetEventCount &&
      iterationCount < MAX_ITERATIONS
    ) {
      const params: Params = {
        city,
        countryCode,
        size: 200,
        page: currentPage.toString(),
      };

      if (category) {
        params.classificationName = category;
      }

      if (date) {
        const dateObj = new Date(date);
        const dateString = dateObj.toISOString().split("T")[0];
        params.startDateTime = `${dateString}T00:00:00Z`;
        params.endDateTime = `${dateString}T23:59:59Z`;
      }
      const key = `ticketmaster_rate_limit_${city}_${countryCode}_${
        (category && encodeURIComponent(category)) || "all"
      }${
        date
          ? `_${
              (typeof date === "string" ? new Date(date) : date)
                .toISOString()
                .split("T")[0]
            }`
          : "any"
      }`;

      const allowed = await ticketmasterRateLimit(key);
      if (!allowed) {
        throw new Error("Rate limit exceeded");
      }

      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json",
        {
          params: {
            ...params,
            apikey: process.env.TICKETMASTER_API_KEY,
          },
        }
      );

      const eventData = response.data._embedded?.events;
      if (!eventData || eventData.length === 0) {
        break;
      }

      const data = eventData.map(transformTicketmasterEvent);

      for (const event of data) {
        const similarEvents = uniqueEvents.filter((uniqueEvent) =>
          isSimilarEvent(uniqueEvent, event)
        );
        if (similarEvents.length > 0) {
          if (!containsKeywords(event.name)) {
            uniqueEvents = uniqueEvents.filter(
              (uniqueEvent) => !isSimilarEvent(uniqueEvent, event)
            );
            uniqueEvents.push(event);
          } else {
            uniqueEvents = uniqueEvents.filter(
              (uniqueEvent) => !isSimilarEvent(uniqueEvent, event)
            );
            const preferredEvent = similarEvents.find(
              (similarEvent) => !containsKeywords(similarEvent.name)
            );
            if (preferredEvent) {
              uniqueEvents.push(preferredEvent);
            }
          }
        } else if (!eventIds.has(event.id) && !eventNames.has(event.name)) {
          if (!containsKeywords(event.name)) {
            uniqueEvents.push(event);
          }
          eventIds.add(event.id);
          eventNames.add(event.name);
        }
      }

      currentPage += 1;
      iterationCount += 1;

   
    }
    await redis.set(
      cacheKey,
      JSON.stringify({ events: uniqueEvents, pageCount: 0 }),
      "EX",
      TTL
    );
    return uniqueEvents.slice(0, targetEventCount);
  } else {
    let iterationCount = 0;
    let hasMore = true;
    const MAX_ITERATIONS = 1;
    const pageSize = 10;
    let uniqueEvents: FetchedEventType[] = [];
    const eventIds: Set<string> = new Set();
    const eventNames: Set<string> = new Set();

    while (uniqueEvents.length < pageSize && iterationCount < MAX_ITERATIONS) {
      const params: Params = {
        city,
        countryCode,
        size: 200,
        page: currentPage.toString(),
      };

      if (category) {
        params.classificationName = category;
      }

      if (date) {
        const dateObj = new Date(date);
        const dateString = dateObj.toISOString().split("T")[0];
        params.startDateTime = `${dateString}T00:00:00Z`;
        params.endDateTime = `${dateString}T23:59:59Z`;
      }
      const key = `ticketmaster_rate_limit_${city}_${countryCode}_${
        (category && encodeURIComponent(category)) || "all"
      }${
        date
          ? `_${
              (typeof date === "string" ? new Date(date) : date)
                .toISOString()
                .split("T")[0]
            }`
          : "any"
      }`;
      const allowed = await ticketmasterRateLimit(key);
      if (!allowed) {
        throw new Error("Rate limit exceeded");
      }

      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json",
        {
          params: {
            ...params,
            apikey: process.env.TICKETMASTER_API_KEY,
          },
        }
      );

      const eventData = response.data._embedded?.events;
      if (!eventData || eventData.length === 0) {
        hasMore = false;
        break;
      }

      const data = eventData.map(transformTicketmasterEvent);

      for (const event of data) {
        const similarEvents = uniqueEvents.filter((uniqueEvent) =>
          isSimilarEvent(uniqueEvent, event)
        );
        if (similarEvents.length > 0) {
          if (!containsKeywords(event.name)) {
            uniqueEvents = uniqueEvents.filter(
              (uniqueEvent) => !isSimilarEvent(uniqueEvent, event)
            );
            uniqueEvents.push(event);
          } else {
            uniqueEvents = uniqueEvents.filter(
              (uniqueEvent) => !isSimilarEvent(uniqueEvent, event)
            );
            const preferredEvent = similarEvents.find(
              (similarEvent) => !containsKeywords(similarEvent.name)
            );
            if (preferredEvent) {
              uniqueEvents.push(preferredEvent);
            }
          }
        } else if (!eventIds.has(event.id) && !eventNames.has(event.name)) {
          if (!containsKeywords(event.name)) {
            uniqueEvents.push(event);
          }
          eventIds.add(event.id);
          eventNames.add(event.name);
        }
      }

      currentPage += 1;
      iterationCount += 1;

  
    }

    await redis.set(
      cacheKey,
      JSON.stringify({
        events: uniqueEvents,
        pageCount: 0,
      }),
      "EX",
      TTL
    );

    const response = {
      events: uniqueEvents.slice(
        (Number(pageParam) - 1) * pageSize,
        Number(pageParam) * pageSize
      ),
      hasMore: uniqueEvents.length > 10,
    };
    return response;
  }
};

const transformTicketmasterEvent = (event: any): FetchedEventType => {
  const bestQualityImage = getBestQualityImage(event.images);

  return {
    id: event.id,
    name: event.name,
    image: bestQualityImage,
    location: `${event._embedded.venues[0].city?.name}, ${event._embedded.venues[0].country?.name}`,
    description: event.info || "",
    category: event.classifications[0].segment.name,
    additionalInfo: event.pleaseNote || "",
    venues: event._embedded.venues.map((venue: any) => venue.name),
    dates: {
      start: parseDate(event.dates.start.dateTime),
      end: event.dates.end ? parseDate(event.dates.end.dateTime) : undefined,
    },
    sales: {
      public: {
        start: parseDate(event.sales.public.startDateTime),
        end: event.sales.public.endDateTime
          ? parseDate(event.sales.public.endDateTime)
          : undefined,
      },
      presales: event.sales.presales
        ? event.sales.presales.map((presale: any) => ({
            start: presale.startDateTime
              ? parseDate(presale.startDateTime)
              : undefined,
            end: presale.endDateTime
              ? parseDate(presale.endDateTime)
              : undefined,
          }))
        : [],
    },
    priceRange: event.priceRanges
      ? {
          min: event.priceRanges[0].min,
          max: event.priceRanges[0].max,
          currency: event.priceRanges[0].currency,
        }
      : { min: null, max: null, currency: "" },
    promoters: event.promoters
      ? event.promoters.map((promoter: any) => promoter.name)
      : [],
    seatmap: event.seatmap ? event.seatmap.staticUrl : "",
  };
};

const getBestQualityImage = (images: any[]) => {
  let bestImage: any = null;

  for (const image of images) {
    const { width, height } = image;

    if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
      if (!bestImage || width > bestImage.width || height > bestImage.height) {
        bestImage = image;
      }
    }
  }

  return bestImage ? bestImage.url : images[0].url;
};

const parseDate = (dateString: string): Date | undefined => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
};

const isSimilarEvent = (
  existingEvent: FetchedEventType,
  newEvent: FetchedEventType
): boolean => {
  const existingStartDate = existingEvent.dates?.start
    ? new Date(existingEvent.dates.start)
    : undefined;
  const newStartDate = newEvent.dates?.start
    ? new Date(newEvent.dates.start)
    : undefined;

  const sameLocation = existingEvent.location === newEvent.location;

  const sameDate =
    existingStartDate &&
    newStartDate &&
    !isNaN(existingStartDate.getTime()) &&
    !isNaN(newStartDate.getTime()) &&
    existingStartDate.toISOString().split("T")[0] ===
      newStartDate.toISOString().split("T")[0];

  const sameVenue = existingEvent.venues?.[0] === newEvent.venues?.[0];

  const sameImage = existingEvent.image === newEvent.image;

  const isSimilar =
    (sameLocation &&
      sameDate &&
      (sameVenue ||
        !existingEvent.venues?.[0] ||
        !newEvent.venues?.[0] ||
        sameImage)) ||
    sameImage;

  return isSimilar;
};

const containsKeywords = (name: string): boolean => {
  // const keywords = ["VIP", "Package"];
  // return keywords.some((keyword) =>
  //   name.toLowerCase().includes(keyword.toLowerCase())
  // );
  return false;
};
