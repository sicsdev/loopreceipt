import { LoopFilters } from "@apiHelpers/types";
import { LoopSource } from "@interfaces/LoopTypes";

export const applyFilters = (page: number, filters?: LoopFilters) => {
  let query = `?page=${page}`;
  if (filters) {
    if (filters.type && filters.from && filters.to) {
      query += `&filter1=type&type=${filters.type}&filter2=date&from=${filters.from}&to=${filters.to}`;
    } else if (filters.from && filters.to) {
      query += `&filter1=date&from=${filters.from}&to=${filters.to}`;
    } else if (filters.type) {
      query += `&filter1=type&type=${filters.type}`;
    }
  }

  return query;
};
