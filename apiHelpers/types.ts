import { LoopSource } from "@interfaces/LoopTypes";

export interface EntityUser {
  contacts?: {
    google: [];
    microsoft: [];
  };
  pushNotifications?: boolean;
  _id?: string;
  userId?: string;
  email: string;
  stripeCustomerId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  name?: string;
  country?: string;
  province?: string;
  state?: string;
  city?: string;
  address?: string;
  profileImage?: string;
}
export interface EntityRecipient {
  email: string;
  name: string;
  postalCode: string;
  address: string;
  company: string;
  state: string;
  phone: string;
  country: string;
  city: string;
}
export interface EntityLooper {
  _id?: string;
  email: string;
  name: string;
}
export type EntityLoopType = "external" | "internal";
export type EntityLoopMode = "single" | "group";
export interface EntityLoop {
  loopid?: string;
  timestamp?: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  barcode: string;
  mode: EntityLoopMode;
  type: EntityLoopType;
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
  mode: EntityLoopMode;
  type: EntityLoopType;
  groupId?: string;
  owner?: string;
  loopers?: EntityLooper[];
  recipient?: EntityRecipient;
  // response only fields
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  draftId?: string;
}
export interface EntitySearchedGroup {
  createdFor: string;
  name: string;
  groupid: string;
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
export interface LoopFilters {
  type: LoopSource;
  from: Date;
  to: Date;
}
export interface ErrorResponse {
  error: boolean;
  message: string;
  info?: string;
}
export interface EntityActivity {
  _id: string;
  seen: boolean;
  title: string;
  category: "Comment" | "Loop" | "Profile" | "Group" | "Contacts";
  createdAt: string;
  metadata?: any;
}

export interface EntitySubscription {
  subscriptionId?: string,
  customerId?: string,
  email?: string,
  status?: string,
  expires_at?: string,
  current_period_end: number,
  card: {
    brand?: string,
    last4?: string
  },
  current_plan?: {
    id: string,
    members: string
  },
  paymentMethod?: {
    id: string,
    card?: {
      last4: string,
      brand: string
    }
  }
}