export interface EntityUser {
  contacts: {
    google: [];
    microsoft: [];
  };
  pushNotifications: boolean;
  _id: string;
  userId: string;
  email: string;
  stripeCustomerId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
}
export interface EntityRecipient {
  email: string;
  name: string;
  postalCode: string;
  address: string;
  company: string;
  country: string;
  city: string;
}
export interface EntityLooper {
  email: string;
  name: string;
}
export interface EntityLoop {
  loopid?: string;
  timestamp?: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  barcode: string;
  type: "external" | "internal";
  loopers: EntityLooper[];
  recipient: EntityRecipient;
}
export interface EntityGroup {
  members: EntityLooper[];
  creator?: {
    isVerified: boolean;
    isFirstTime: boolean;
    name: string;
    email: string;
    userid: string;
  };
  createdAt?: string;
  __v?: string;
  groupid?: string;
}
