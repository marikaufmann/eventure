export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture?: string;
  phone?: string;
  events?: string;
  savedEvents?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type EventType = {
  _id: string;
  user: UserType["_id"];
  name: string;
  image: string;
  location: string;
  description: string;
  category: string;
  additionalInfo: string;
  venues: string[];
  dates: {
    start: Date;
    end?: Date;
  };
  sales: {
    public: {
      start: Date;
      end?: Date;
    };
    presales?: {
      start?: Date;
      end?: Date;
    }[];
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  promoters?: string[];
  seatmap?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FetchedEventType = {
  id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  category: string;
  additionalInfo: string;
  venues: string[];
  dates: {
    start: Date | undefined;
    end?: Date | undefined;
  };
  sales: {
    public: {
      start: Date | undefined;
      end?: Date | undefined;
    };
    presales?: {
      start?: Date | undefined;
      end?: Date | undefined;
    }[];
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  promoters?: string[];
  seatmap?: string;
};

export type SessionType = {
  _id: string;
  user: UserType["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};
