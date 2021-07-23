export type LoopType = "outgoing" | "received" | "drafts";
export type LoopSource = "all" | "external" | "internal";
export type DateRange = {
  start: Date | null;
  end: Date | null;
};
