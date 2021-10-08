import NoLoopReceipt from "@components/Dashboard/NoLoopReceipt";

import UPadWrapper from "@components/Shared/UPadWrapper";
import Links from "@components/Dashboard/Links";

import Button from "@components/Controls/Button";
import MyLoader from "@components/Shared/MyLoader";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import { useDateTypeFilterAndPagination } from "@components/Dashboard/Tabs/useDateTypeFilterAndPagination";
import { makeStyles } from "@material-ui/core";

import { EntityLoop } from "@apiHelpers/types";
import React, { useEffect, useMemo, useState } from "react";
import { DateRange, LoopSource, LoopType } from "@interfaces/LoopTypes";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import FilterDropdowns from "@components/Dashboard/FilterDropdowns";
import Pagination from "@components/Dashboard/Pagination";
import LoopCard from "@components/Dashboard/LoopCard";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useSwipeable } from "react-swipeable";
import Win from "@helpers/Win";
import { setActiveTabIndex } from "@store/slices/dashboardSlice";
import { useFetchReturnType } from "@hooks/useFetch";
import MessageCard from "@components/Shared/MessageCard";
import { useWaiter } from "@hooks/useWaiter";
export const tabs: LoopType[] = ["outgoing", "received", "drafts"];
export const itemsPerPageOptions = [5, 10, 15];
export interface StdData {
  items: any[];
  total: number;
}
interface TabsBaseProps {
  getter: useFetchReturnType<StdData>;
}
const TabsBase = ({ getter }: TabsBaseProps) => {
  const styles = useStyles();
  const [loopSource, setLoopSource] = useState<LoopSource>("all");
  const [searchStr, setSearchStr] = useState<string>("");
  const { windowDimensions } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { wait } = useWaiter(0);
  const win = new Win(windowDimensions);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  const activeTabIndex = useAppSelector(
    (state) => state.dashboard.activeTabIndex
  );

  const user = useAppSelector((state) => state.user.user);
  const [noItems, setNoItems] = useState(true);
  useEffect(() => {
    if (noItems && getter.data?.total) {
      setNoItems(false);
    }
  }, [getter.data]);

  useDateTypeFilterAndPagination({
    getter,
    page,
    dateRange,
    loopSource,
    searchStr,
    setPage,
  });
  // this should be defined before return statements
  const mobileNewButton = ListenClickAtParentElement(
    (e) => {
      openModal(e, {
        translationsFrom: "element",
        positionWRTPoint: {
          bottom: true,
        },
        translations: {
          y: 20,
        },
      });
    },
    (childClick) => (
      <Button labelWeight="bold" shrink onClick={childClick}>
        + New
      </Button>
    )
  );
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // console.log("swipe left");
      if (activeTabIndex + 1 < tabs.length) {
        dispatch(setActiveTabIndex(activeTabIndex + 1));
      }
    },
    onSwipedRight: () => {
      // console.log("swipe right");
      if (activeTabIndex - 1 >= 0) {
        dispatch(setActiveTabIndex(activeTabIndex - 1));
      }
    },
  });
  const filteredItems = useMemo(() => {
    // console.log(user);
    // let filterLogic = (item: any) => true;
    // if (activeTabIndex === 0) {
    //   filterLogic = (item: any) => item.owner.userid === user?.userId;
    // } else if (activeTabIndex === 1) {
    //   filterLogic = (item: any) =>
    //     item.isReceived === true && item.receivedBy === user?.email;
    // }
    return getter.data ? getter.data.items : [];
  }, [getter.data, user]);
  return (
    <div className={styles.right}>
      <div
        style={{
          display: win.down("sm") ? "block" : "none",
        }}
      >
        <div className="top">
          <p className="head">My Loops</p>
          {mobileNewButton}
        </div>
      </div>
      <Links links={tabs} />
      <div
        className="dropdowns"
        style={{ display: noItems ? "none" : "block" }}
      >
        <FilterDropdowns
          loopSource={loopSource}
          setLoopSource={setLoopSource}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      </div>
      {wait || getter.loading ? (
        <div style={{ paddingTop: "3rem" }}>
          <MyLoader loaded={!getter.loading} />
        </div>
      ) : getter.data?.items ? (
        <>
          <UPadWrapper>
            <>
              {noItems && (
                <NoLoopReceipt activeTab={tabs[activeTabIndex]} user={user} />
              )}
              {!noItems && getter.data.items.length == 0 && (
                <div className="noLoopsMessage">No Entries Found</div>
              )}
              <div
                className={styles.rest}
                style={{
                  display: noItems ? "none" : "block",
                }}
              >
                <div className="cards" {...swipeHandlers}>
                  {filteredItems.map((item, i) => (
                    <LoopCard key={i} type={tabs[activeTabIndex]} loop={item} />
                  ))}
                </div>

                <div className="pagination">
                  <Pagination
                    totalItems={getter.data.total}
                    itemsPerPageOptions={itemsPerPageOptions}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            </>
          </UPadWrapper>
        </>
      ) : (
        <div
          style={{
            padding: 20,
          }}
        >
          <MessageCard type="warning">Some error occured</MessageCard>
        </div>
      )}
    </div>
  );
};
export default TabsBase;
const useStyles = makeStyles((theme) => ({
  right: {
    marginLeft: 250,
    padding: "3rem 2rem",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
    },
    "& .dropdowns": {
      padding: "0 4%",
      paddingTop: "0rem",
      [theme.breakpoints.down("sm")]: {
        paddingTop: "2rem",
      },
    },
    "& .top": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1.5rem 4%",
      "& .head": {
        fontSize: "1.3rem",
        fontWeight: "500",
      },
    },
    "& .noLoopsMessage": {
      textAlign: "center",
      fontSize: 20,
      marginTop: "4rem",
    },
  },
  rest: {
    "& .cards": {
      // border: "1px solid red",
      padding: "3rem 0",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 40,
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
    "& .pagination": {},
  },
}));
