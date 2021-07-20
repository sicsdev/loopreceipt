import { makeStyles } from "@material-ui/core";
import Sidebar from "@components/Navbar/DesktopSidebar";
import Links from "@components/Dashboard/Links";
import UpperBar from "@components/shared/UpperBar";
import Button from "@components/Controls/Button";
import Layout from "@components/Layout";
import OptionCard from "@components/Dashboard/OptionCard";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import ListenClickAtParentElement from "@components/shared/ListenClickAtParentElement";
import { openModal } from "@store/slices/modalSlice";
import LoopCard from "@components/Dashboard/LoopCard";
import Win from "@helpers/Win";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useRef, useState } from "react";
import { DateRange, LoopSource, LoopType } from "@interfaces/LoopTypes";
import OptionCards from "@components/Dashboard/OptionCards";
import DetectSwipe from "@components/shared/DetectSwipe";
import Dropdown from "@components/Controls/Dropdown";
import FilterDropdowns from "@components/Dashboard/FilterDropdowns";
interface DashboardProps {
  path: string;
}
const links: LoopType[] = ["outgoing", "received", "drafts"];
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
          </div>
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
    // padding: "1.5rem 4%",
    "& .loopCards": {
      margin: "3rem 0",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 63,
      [theme.breakpoints.down("lg")]: {
        justifyContent: "space-around",
      },
    },
  },
}));
