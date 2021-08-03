import { DateRange, LoopSource } from "@interfaces/LoopTypes";
import { makeStyles } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";
import StyledMenu from "@components/Shared/StyledMenu";
import { StyledMenuItem } from "@components/Shared/StyledMenu";
import Dropdown from "@components/Controls/Dropdown";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import Win from "@helpers/Win";
import { capitalize } from "@helpers/utils";
import Image from "next/image";
import DatePicker, {
  DatePickerProps,
} from "@components/Shared/DatePicker/DatePicker";
import Button from "@components/Controls/Button";
import ListenClickAtParentElement from "@components/Shared/ListenClickAtParentElement";
import MovableModal from "@components/Shared/MovableModal";
import { SliceModalType } from "@store/slices/modalSlice";
import { dmy, months, twoDateString } from "@helpers/dateFormats";
const loopSources: LoopSource[] = ["all", "internal", "external"];
interface FilterDropdownsProps {
  loopSource: LoopSource;
  setLoopSource: React.Dispatch<React.SetStateAction<LoopSource>>;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const FilterDropdowns = ({
  loopSource,
  setLoopSource,
  dateRange,
  setDateRange,
}: FilterDropdownsProps) => {
  const { windowDimensions } = useWindowDimensions();
  const win = new Win(windowDimensions);
  const styles = useStyles();
  const loopSelectRef = useRef<HTMLDivElement>(null);
  const [selectingLoopSource, setSelectingLoopSource] = useState(false);
  const [mouseEvent, setMouseEvent] = useState<SliceModalType["mouseEvent"]>();
  const [selectingDateRange, setSelectingDateRange] = useState(false);

  const pickers = (monthSelectorType: DatePickerProps["monthSelectorType"]) => [
    <DatePicker
      key={0}
      monthSelectorType={monthSelectorType}
      dateRange={dateRange}
      setDateRange={setDateRange}
      pickerType="start"
    />,
    <DatePicker
      key={1}
      monthSelectorType={monthSelectorType}
      dateRange={dateRange}
      setDateRange={setDateRange}
      pickerType="end"
    />,
  ];

  const resetDateRange = () => {
    setDateRange(() => {
      return {
        start: null,
        end: null,
      };
    });
  };
  const dateRangeString =
    dateRange.start && dateRange.end
      ? twoDateString(dateRange.start, dateRange.end)
      : dateRange.start
      ? dmy(dateRange.start)
      : dateRange.end
      ? dmy(dateRange.end)
      : "All";
  return (
    <>
      <div className={styles.FilterDropdowns}>
        <div
          className="dateRange"
          onClick={() => {
            setSelectingDateRange(true);
          }}
        >
          <Image
            alt="icon"
            src="/icons/dashboard/calender.svg"
            width={18}
            height={16}
          />
          &nbsp;
          {dateRangeString}
        </div>
        <div ref={loopSelectRef} className="dd">
          <Dropdown
            name="Loop Type"
            option={capitalize(loopSource)}
            aria-controls="select-loop-type"
            aria-haspopup="true"
            onClick={() => setSelectingLoopSource(true)}
          />
          <StyledMenu
            open={selectingLoopSource}
            id="select-loop-type"
            anchorEl={loopSelectRef.current}
            onClose={() => {
              setSelectingLoopSource(false);
            }}
          >
            {loopSources.map((source) => (
              <StyledMenuItem
                key={source}
                onClick={() => {
                  setLoopSource(source);
                  setSelectingLoopSource(false);
                }}
                selected={loopSource === source}
              >
                {capitalize(source)} Loops
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </div>
        {ListenClickAtParentElement(
          (e) => {
            // console.log(e.target);
            // element.getBoundingClientRect().top + document.documentElement.scrollTop
            e.stopPropagation();
            // so that when we click on dropdown
            // while it is active
            // we don't close because of click listener on window

            const target = e.target as HTMLElement;
            const box = target.getBoundingClientRect();
            // console.log(box);
            setMouseEvent({
              anchorBox: {
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              },
            });
            setSelectingDateRange(true);
          },
          (childClick) => (
            <div
              className="dd"
              style={{
                display: win.up("md") ? "block" : "none",
              }}
            >
              <Dropdown
                name="Date Range"
                option={dateRangeString}
                aria-controls="select-date-range"
                aria-haspopup="true"
                onClick={childClick}
              />
            </div>
          )
        )}
      </div>
      {selectingDateRange && (
        <div>
          {win.down("sm") ? (
            <div
              className={styles.mobileDatePicker}
              style={{
                height: windowDimensions.innerHeight + "px",
              }}
            >
              <div className="top">
                <div
                  className="back"
                  onClick={() => setSelectingDateRange(false)}
                >
                  <Image
                    alt="icon"
                    src="/icons/dashboard/back.svg"
                    width={15}
                    height={20}
                  />
                </div>
                <p
                  className="clear"
                  onClick={() => {
                    resetDateRange();
                  }}
                >
                  Clear
                </p>
              </div>
              <div className="picker">
                {pickers("table")[0]}
                {pickers("table")[1]}
              </div>
              <div className="end">
                <Button>Save</Button>
              </div>
            </div>
          ) : (
            <MovableModal
              showModal={selectingDateRange}
              closeModal={() => setSelectingDateRange(false)}
              mouseEvent={mouseEvent}
              translationsFrom="element"
              positionWRTPoint={{
                bottom: true,
                left: true,
              }}
              translations={{
                x: 200,
                y: 0,
              }}
            >
              <div className={styles.desktopDatePicker}>
                <div className="picker">{pickers("dropdown")[0]}</div>
                <div className="divider" />
                <div className="picker">{pickers("dropdown")[1]}</div>
                <p
                  className="clear"
                  onClick={() => {
                    resetDateRange();
                  }}
                >
                  Clear
                </p>
              </div>
            </MovableModal>
          )}
        </div>
      )}
    </>
  );
};
export default FilterDropdowns;
const useStyles = makeStyles((theme) => ({
  FilterDropdowns: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "2rem",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      gap: 0,
    },
    "& .dateRange": {
      zIndex: 9,
      // more than sidebarListener
      // so that we can listen the click on it
      // but must be more than navbar
      marginRight: "auto",
      border: "1px solid #CECECE",
      color: "#828282",
      fontSize: 14,
      padding: 8,
      borderRadius: 4,
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        gap: 8,
      },
    },
    "& .dd": {
      paddingBottom: 4,
      [theme.breakpoints.up("md")]: {
        padding: "1rem 0",
      },
    },
  },
  mobileDatePicker: {
    // padding: "0 4%",
    paddingBottom: "2rem",
    zIndex: 100,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    overflow: "auto",
    backgroundColor: "white",
    "& .top": {
      // border: "1px solid blue",
      zIndex: 20,
      position: "fixed",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      "& .back": {
        // border: "1px solid blue",
        display: "flex",
        cursor: "pointer",
      },
      "& .clear": {
        fontWeight: 500,
        fontSize: 18,
        textDecoration: "underline",
      },
    },
    "& .picker": {
      marginTop: "5rem",
    },
    "& .end": {
      padding: "0 4%",
      textAlign: "right",
    },
  },
  desktopDatePicker: {
    boxShadow: "0px 0px 4px 0px #00000040",
    borderRadius: 8,
    display: "flex",
    padding: "1rem",
    backgroundColor: "white",
    position: "relative",
    "& .picker": {
      width: 275,
      marginBottom: "-1rem",
    },
    "& .divider": {
      width: 2,
      backgroundColor: "#dfdfdf",
      margin: "0 2rem",
    },
    "& .clear": {
      position: "absolute",
      right: "1rem",
      fontWeight: 500,
      fontSize: 18,
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));
