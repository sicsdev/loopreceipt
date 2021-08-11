import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";

import Button from "@components/Controls/Button";
import Layout from "@components/Global/Layout";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import LoopCard from "@components/Dashboard/LoopCard";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import { DateRange, LoopSource, LoopType } from "@interfaces/LoopTypes";
import FilterDropdowns from "@components/Dashboard/FilterDropdowns";
import Pagination from "@components/Dashboard/Pagination";
import Image from "next/image";
import {
  openGettingStartedGuide,
  setActiveTabIndex,
} from "@store/slices/dashboardSlice";

import useSWR from "swr";
import { EntityLoop, EntityUser } from "apiHelpers/types";
import { compareOnlyDate } from "@helpers/dateCalculations";
import NoLoopReceipt from "@components/Dashboard/NoLoopReceipt";
import { baseURL } from "@apiHelpers/axios";
import { useRouter } from "next/router";
import UPadWrapper from "@components/Shared/UPadWrapper";
import { useSwipeable } from "react-swipeable";
import { useFetch } from "@hooks/useFetch";
import usersApi from "@apiClient/usersApi";
import loopsApi from "@apiClient/loopsApi";
import MyLoader from "@components/Shared/MyLoader";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setUser } from "@store/slices/userSlice";
import Outgoing from "@components/Dashboard/Tabs/Outgoing";
import Received from "@components/Dashboard/Tabs/Received";
import Drafts from "@components/Dashboard/Tabs/Drafts";
import { getEpochDateRangeFromDateRange } from "@helpers/dateFormats";
interface DashboardProps {
  path: string;
}
const tabs: LoopType[] = ["outgoing", "received", "drafts"];
const itemsPerPageOptions = [5, 10, 15];
const Dashboard = ({ path }: DashboardProps) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean>();

  const router = useRouter();
  // console.log(loops);

  const { data: userData } = useFetch<{ user: EntityUser }>(usersApi.getMe);
  const dispatch = useAppDispatch();

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const activeTabIndex = useAppSelector(
    (state) => state.dashboard.activeTabIndex
  );
  const [loopSource, setLoopSource] = useState<LoopSource>("all");
  const [loopsIsEmpty, setLoopsIsEmpty] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  const getLoops = useFetch<{ loops: EntityLoop[]; totalLoops: number }>(
    loopsApi.getAll,
    { deferred: true }
  );
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (userData?.user) {
      dispatch(setUser(userData.user));
    }
  }, [userData]);
  useEffect(() => {
    setIsFirstTime(Cookies.get("isFirstTime") === "true");
  }, []);
  const fetchLoopsData = async () => {
    let loopsResponse:
      | {
          loops: EntityLoop[];
          totalLoops: number;
        }
      | undefined;
    if (dateRange.start || dateRange.end) {
      // apply date filters

      // console.log(localDateRange);
      const { start, end } = getEpochDateRangeFromDateRange(dateRange);
      loopsResponse = await getLoops.sendRequest(page, {
        type: loopSource === "all" ? undefined : loopSource,
        from: start,
        to: end,
      });
    } else {
      loopsResponse = await getLoops.sendRequest(page, {
        type: loopSource === "all" ? undefined : loopSource,
      });
    }
    if (loopsResponse?.loops.length) {
      setLoopsIsEmpty(false);
    }
    return loopsResponse;
  };

  useEffect(() => {
    fetchLoopsData();
  }, [page]);
  useEffect(() => {
    if (page != 1) {
      setPage(1);
      // now on page change we automatically run fetchLoopsData
    } else {
      fetchLoopsData();
    }
  }, [loopSource, dateRange]);
  // console.log(win.up("md"));

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
  const loopsSwipeHandlers = useSwipeable({
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

  return (
    <Layout>
      <div className={styles.dashboard}>
        {win.up("md") && <Sidebar path={path} />}
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

          <div className="dropdowns">
            <FilterDropdowns
              loopSource={loopSource}
              setLoopSource={setLoopSource}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          {getLoops.loading ? (
            <div style={{ paddingTop: "3rem" }}>
              <MyLoader loaded={!getLoops.loading} />
            </div>
          ) : getLoops.data?.loops ? (
            <>
              <UPadWrapper>
                <>
                  {loopsIsEmpty && (
                    <NoLoopReceipt
                      activeTab={tabs[activeTabIndex]}
                      user={user}
                    />
                  )}
                  {!loopsIsEmpty && getLoops.data.loops.length == 0 && (
                    <div className="noLoopsMessage">No Loops Found</div>
                  )}
                  <div
                    className={styles.rest}
                    style={{
                      display: loopsIsEmpty ? "none" : "block",
                    }}
                  >
                    <div className="loopCards" {...loopsSwipeHandlers}>
                      {getLoops.data.loops.map((loop) => (
                        <LoopCard
                          key={loop.loopid}
                          type={tabs[activeTabIndex]}
                          loop={loop}
                        />
                      ))}
                      {tabs[activeTabIndex] === "outgoing" ? (
                        <Outgoing />
                      ) : tabs[activeTabIndex] === "received" ? (
                        <Received />
                      ) : (
                        <Drafts />
                      )}
                    </div>

                    <div className="pagination">
                      <Pagination
                        totalItems={getLoops.data.totalLoops}
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
            <div>Error</div>
          )}
        </div>
        {isFirstTime && (
          <div className={styles.iconGettingStarted}>
            {win.down("xs") ? (
              <div className="icon" onClick={openGettingStartedGuide}>
                <Image
                  alt="icon"
                  src="/icons/dashboard/menu.svg"
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <Button labelColor="white" onClick={openGettingStartedGuide}>
                Getting Started
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Dashboard;

const useStyles = makeStyles((theme) => ({
  dashboard: {},

  right: {
    marginLeft: 250,
    padding: "5rem 4rem",
    // border: "2px solid blue",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: "0",
    },
    "& .dropdowns": {
      padding: "0 4%",
      paddingTop: "2rem",
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
    "& .loopCards": {
      padding: "3rem 0",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 40,
      [theme.breakpoints.down("lg")]: {
        justifyContent: "space-around",
      },
    },
    "& .pagination": {},
  },
  iconGettingStarted: {
    position: "fixed",
    bottom: 40,
    right: 50,
    [theme.breakpoints.down("xs")]: {
      right: 20,
    },
    userSelect: "none",
    cursor: "pointer",
    "& .icon": {
      width: 61,
      height: 61,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      backgroundColor: "#363F4D",
    },
    "& .MuiButtonBase-root": {
      backgroundColor: "#363F4D",
    },
  },
}));
