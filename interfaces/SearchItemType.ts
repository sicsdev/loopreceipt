export interface MatchDetails {
  length?: number | undefined;
  startIndex?: number | undefined;
}
export interface SearchItemType<T> {
  primary: string;
  secondary: string;
  primaryMatch?: MatchDetails;
  secondaryMatch?: MatchDetails;
  active?: boolean | undefined;
  entity?: T;
}
