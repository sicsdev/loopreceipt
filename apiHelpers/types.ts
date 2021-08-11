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
  _id?: string;
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

// just owner and timestamp is extra
export interface EntityDraft {
  timestamp?: string;
  country?: string;
  province?: string;
  city?: string;
  postalCode?: string;
  barcode?: string;
  type?: "external" | "internal";
  owner?: string;
  loopers?: EntityLooper[];
  recipient?: EntityRecipient;
  // response only fields
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  draftId?: string;
}
export interface EntityGroup {
  createdFor: string;
  name: string;
  recipient: EntityRecipient;
  loopers: EntityLooper[];
  // below fields are only received in EntityGroup received as response
  isDefault?: boolean;
  creator?: string;

  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  groupid?: string;
}
// fields marked as ? are filled only on entity received in response
