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
import { openGettingStartedGuide } from "@store/slices/genericSlice";

import useSWR from "swr";
import { EntityLoop } from "apiHelpers/types";
import { compareOnlyDate } from "@helpers/dateCalculations";
import NoLoopReceipt from "@components/Dashboard/NoLoopReceipt";
import { baseURL } from "@apiHelpers/axios";
import { useRouter } from "next/router";
import UPadWrapper from "@components/Shared/UPadWrapper";
import { useSwipeable } from "react-swipeable";
interface DashboardProps {
  path: string;
}
const links: LoopType[] = ["outgoing", "received", "drafts"];
const itemsPerPageOptions = [5, 10, 15];
const Dashboard = ({ path }: DashboardProps) => {
  const router = useRouter();
  // console.log(loops);
  const { data, error } = useSWR(baseURL + "/loops");

  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loopSource, setLoopSource] = useState<LoopSource>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [filteredLoops, setFilteredLoops] = useState<EntityLoop[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  // console.log(win.up("md"));

  useEffect(() => {
    if (!data || !data.loops) return;
    // console.log(data.loops);
    let localLoops = [...data.loops];
    if (loopSource !== "all") {
      localLoops = localLoops.filter((loop) => loop.type === loopSource);
    }
    if (dateRange.start && dateRange.end) {
      localLoops = localLoops.filter(
        (loop) =>
          compareOnlyDate(new Date(loop.timestamp!), dateRange.start!) >= 0 &&
          compareOnlyDate(new Date(loop.timestamp!), dateRange.end!) <= 0
      );
    } else if (dateRange.start) {
      localLoops = localLoops.filter(
        (loop) =>
          compareOnlyDate(new Date(loop.timestamp!), dateRange.start!) == 0
      );
    } else if (dateRange.end) {
      localLoops = localLoops.filter(
        (loop) =>
          compareOnlyDate(new Date(loop.timestamp!), dateRange.end!) == 0
      );
    }
    setFilteredLoops(localLoops);
  }, [data, itemsPerPage, page, loopSource, dateRange]);
  const paginatedLoops = () => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredLoops.slice(startIndex, startIndex + itemsPerPage);
  };
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
      if (activeIndex + 1 < links.length) {
        setActiveIndex(activeIndex + 1);
      }
    },
    onSwipedRight: () => {
      // console.log("swipe right");
      if (activeIndex - 1 >= 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
  });
  if (error) {
    // router.push("/login");
    // console.log(error);
    // if (error.message === "Access denied no token provided.") {
    //   router.push("/login");
    // }
    return <h1>Error occurred</h1>;
  }

  if (!data || !data.loops) return <h1>Loading...</h1>;

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

          <Links
            links={links}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          {data.loops.length > 0 && (
            <div className="dropdowns">
              <FilterDropdowns
                loopSource={loopSource}
                setLoopSource={setLoopSource}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          )}
          {data.loops.length === 0 && <NoLoopReceipt />}
          <UPadWrapper>
            <div
              className={styles.rest}
              style={{ display: data.loops.length === 0 ? "none" : "block" }}
            >
              <div className="loopCards" {...loopsSwipeHandlers}>
                {paginatedLoops().map((loop) => (
                  <LoopCard
                    key={loop.loopid}
                    type={links[activeIndex]}
                    loop={loop}
                  />
                ))}
              </div>

              <div className="pagination">
                <Pagination
                  totalItems={filteredLoops.length}
                  itemsPerPageOptions={itemsPerPageOptions}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </div>
          </UPadWrapper>
        </div>
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
      </div>
    </Layout>
  );
};
export default Dashboard;

const useStyles = makeStyles((theme) => ({
  dashboard: {},

  right: {
    marginLeft: 250,
    padding: "3rem 4rem",
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
