import { getEpochDateRangeFromDateRange } from "@helpers/dateFormats";
import { useFetchReturnType } from "@hooks/useFetch";
import { DateRange, LoopSource } from "@interfaces/LoopTypes";
import { useEffect, useState } from "react";
export const useDateTypeFilterAndPagination = <T>({
  getter,
  dateRange,
  loopSource,
  page,
  searchStr,
  setPage,
}: {
  getter: useFetchReturnType<T>;
  dateRange: DateRange;
  loopSource: LoopSource;
  page: number;
  searchStr: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const fetchData = async () => {
    if(searchStr !== "") {
      if (dateRange.start || dateRange.end) {
        const { start, end } = getEpochDateRangeFromDateRange(dateRange);
        await getter.sendRequest(page, {
          type: loopSource === "all" ? undefined : loopSource,
          from: start,
          to: end,
          name: searchStr
        });
      } else {
        await getter.sendRequest(page, {
          type: loopSource === "all" ? undefined : loopSource,
          name: searchStr
        });
      }
    } else {
      if (dateRange.start || dateRange.end) {
        const { start, end } = getEpochDateRangeFromDateRange(dateRange);
        await getter.sendRequest(page, {
          type: loopSource === "all" ? undefined : loopSource,
          from: start,
          to: end,
        });
      } else {
        await getter.sendRequest(page, {
          type: loopSource === "all" ? undefined : loopSource,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  useEffect(() => {
    if (page != 1) {
      setPage(1);
      // now on page change we automatically run fetchLoopsData
    } else {
      fetchData();
    }
  }, [loopSource, dateRange, searchStr]);
};
