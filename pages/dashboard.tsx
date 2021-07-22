import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";

import Button from "@components/Controls/Button";
import Layout from "@components/Layout";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import LoopCard from "@components/Dashboard/LoopCard";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useState } from "react";
import { DateRange, LoopSource, LoopType } from "@interfaces/LoopTypes";
import DetectSwipe from "@components/Shared/DetectSwipe";
import FilterDropdowns from "@components/Dashboard/FilterDropdowns";
import Pagination from "@components/Dashboard/Pagination";
import Image from "next/image";
interface DashboardProps {
  path: string;
}
const links: LoopType[] = ["outgoing", "received", "drafts"];
const itemsPerPageOptions = [5, 10, 15];
const Dashboard = ({ path }: DashboardProps) => {
  const styles = useStyles();
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loopSource, setLoopSource] = useState<LoopSource>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [page, setPage] = useState(1);
  // console.log(win.up("md"));
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

              {ListenClickAtParentElement(
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
              )}
            </div>
          </div>

          <Links
            links={links}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <div className="dropdowns">
            <FilterDropdowns
              loopSource={loopSource}
              setLoopSource={setLoopSource}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          {/* <UpperBar>
            <div className={styles.bar}>
              <div className="profile">
                <p className="icon">G</p>
                <p>Gari Boetang</p>
              </div>
              {win.up("md") &&
                ListenClickAtParentElement(
                  (e) => {
                    openModal(e, {
                      translationsFrom: "element",
                      positionWRTPoint: {
                        bottom: true,
                        left: true,
                      },
                      translations: {
                        y: 20,
                        x: (e.target as any).offsetWidth,
                      },
                    });
                  },
                  (childClick) => (
                    <Button onClick={childClick}>+ New Loopreceipt</Button>
                  )
                )}
            </div>
          </UpperBar> */}
          <div className={styles.rest}>
            {/* <Typography
              variant="body1"
              gutterBottom
              style={{
                fontWeight: "bold",
                color: "#4F5257",
              }}
            >
              You dont have any Loopreceipts yet.
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "#4F5257",
              }}
            >
              You’ll want to add recipients to create Loops with you.
            </Typography> */}
            <DetectSwipe
              onSwipedLeft={() => {
                // console.log("swipe left");
                if (activeIndex + 1 < links.length) {
                  setActiveIndex(activeIndex + 1);
                }
              }}
              onSwipedRight={() => {
                // console.log("swipe right");
                if (activeIndex - 1 >= 0) {
                  setActiveIndex(activeIndex - 1);
                }
              }}
            >
              <div className="loopCards">
                <LoopCard type={links[activeIndex]} />
                <LoopCard type={links[activeIndex]} />
                <LoopCard type={links[activeIndex]} />
                <LoopCard type={links[activeIndex]} />
                <LoopCard type={links[activeIndex]} />
                <LoopCard type={links[activeIndex]} />
              </div>
            </DetectSwipe>
            {/* <OptionCards /> */}
            <div className="pagination">
              <Pagination
                totalItems={100}
                itemsPerPageOptions={itemsPerPageOptions}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
        <div className={styles.iconGettingStarted}>
          {win.down("xs") ? (
            <div className="icon">
              <Image src="/icons/dashboard/menu.svg" width={30} height={30} />
            </div>
          ) : (
            <Button labelColor="white">Getting Started</Button>
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
      padding: "1.5rem 4%",
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
  bar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 4%",
    paddingTop: "1.5rem",
    "& .profile": {
      display: "flex",
      alignItems: "center",
      gap: 16,
      "& .icon": {
        width: 47,
        height: 47,
        backgroundColor: "#C5C5C5",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "500",
        fontSize: "1.2rem",
      },
    },
  },
  rest: {
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem 4%",
    },
    "& .loopCards": {
      margin: "3rem 0",
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
