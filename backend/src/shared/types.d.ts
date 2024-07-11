export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionType = {
  _id: string;
  user: UserType["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
};
