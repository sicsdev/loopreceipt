export interface SearchItemType<T> {
  primary: string;
  secondary: string;
  matchLength?: number | undefined;
  matchStartIndex?: number | undefined;
  active?: boolean | undefined;
  entity?: T;
}
