import { LoopFilters } from "@apiHelpers/types";
import { LoopSource } from "@interfaces/LoopTypes";
import { filter } from "lodash";

export const applyFilters = (page: number, filters?: LoopFilters) => {
  let query = `?page=${page}`;
  if (filters) {
    if (filters.type && filters.from && filters.to && filters.name) {
      query += `&search_str=${filters.name}&filter1=type&type=${filters.type}&filter2=date&from=${filters.from}&to=${filters.to}`;
    } else if (filters.from && filters.to && filters.name) {
      query += `&search_str=${filters.name}&filter1=date&from=${filters.from}&to=${filters.to}`;
    } else if (filters.type && filters.name) {
      query += `&search_str=${filters.name}&filter1=type&type=${filters.type}`;
    } else if(filters.type && filters.from && filters.to) {
      query += `&filter1=type&type=${filters.type}&filter2=date&from=${filters.from}&to=${filters.to}`;
    } else if(filters.from && filters.to){
      query += `&filter1=date&from=${filters.from}&to=${filters.to}`;
    } else if(filters.type){
      query += `&filter1=type&type=${filters.type}`;
    } else if(filters.name) {
      query += `&search_str=${filters.name}`
    }
  }

  return query;
};
