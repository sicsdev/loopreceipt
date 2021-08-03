import { days, dmy, months } from "@helpers/dateFormats";
import {
  compareOnlyDate,
  getNumDaysMonthWise,
} from "@helpers/dateCalculations";
import { range } from "@helpers/utils";
import { makeStyles, MenuItem, Menu, capitalize } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "@interfaces/LoopTypes";
import { useSwipeable } from "react-swipeable";

type DateType = {
  date: Date;
  disabled: boolean;
  rangeStartCapsule: boolean;
  rangePartCapsule: boolean;
  rangeEndCapsule: boolean;
};
export interface DatePickerProps {
  monthSelectorType: "dropdown" | "table";
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  pickerType: "start" | "end";
}
const years = [2019, 2020, 2021, 2022, 2023];
const DatePicker = ({
  monthSelectorType,
  dateRange,
  setDateRange,
  pickerType,
}: DatePickerProps) => {
  const today = new Date();
  const [curMonth, setCurMonth] = useState(() => {
    if (pickerType === "start")
      return dateRange.start?.getMonth() ?? today.getMonth();
    // here nullish coll is imp since month can be 0
    return dateRange.end?.getMonth() ?? today.getMonth();
  });
  const [curYear, setCurYear] = useState(() => {
    if (pickerType === "start")
      return dateRange.start?.getFullYear() ?? today.getFullYear();
    return dateRange.end?.getFullYear() ?? today.getFullYear();
  });

  const [dates, setDates] = useState<DateType[]>([]);
  const styles = useStyles();
  const monthHeadRef = useRef<HTMLDivElement>(null);
  const yearHeadRef = useRef<HTMLDivElement>(null);
  const [selectingMonth, setSelectingMonth] = useState(false);
  const [selectingYear, setSelectingYear] = useState(false);
  useEffect(() => {
    if (curMonth < 0) {
      setCurYear(curYear - 1);
      setCurMonth(11);
      return;
    } else if (curMonth > 11) {
      setCurYear(curYear + 1);
      setCurMonth(0);
      return;
    }
    let numDaysMonthWise = getNumDaysMonthWise(curYear);

    let prevMonth = curMonth - 1;
    let prevYear = curYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear = curYear - 1;
    }
    const firstDayOfCurMonth = new Date(
      `${curMonth + 1}/1/${curYear}`
    ).getDay();

    // console.log(firstDayOfCurMonth);
    const daysInPrevMonth = numDaysMonthWise[prevMonth];
    let prevMonthDates: DateType[] = [];
    const rangeStartPartEndProps = (date: Date) => {
      if (dateRange.start && dateRange.end) {
        return {
          rangeStartCapsule: compareOnlyDate(date, dateRange.start) === 0,
          rangePartCapsule:
            compareOnlyDate(date, dateRange.start) >= 0 &&
            compareOnlyDate(date, dateRange.end) <= 0,
          rangeEndCapsule: compareOnlyDate(date, dateRange.end) === 0,
        };
      } else if (dateRange.start) {
        return {
          rangeStartCapsule: compareOnlyDate(date, dateRange.start) === 0,
          rangePartCapsule: false,
          rangeEndCapsule: compareOnlyDate(date, dateRange.start) === 0,
        };
      } else if (dateRange.end) {
        return {
          rangeStartCapsule: compareOnlyDate(date, dateRange.end) === 0,
          rangePartCapsule: false,
          rangeEndCapsule: compareOnlyDate(date, dateRange.end) === 0,
        };
      } else {
        return {
          rangeStartCapsule: false,
          rangePartCapsule: false,
          rangeEndCapsule: false,
        };
      }
    };
    prevMonthDates = range(
      daysInPrevMonth - firstDayOfCurMonth + 1,
      daysInPrevMonth
    ).map((d) => {
      const date = new Date(`${prevMonth + 1}/${d}/${prevYear}`);
      return {
        date,
        disabled: true,
        ...rangeStartPartEndProps(date),
      };
    });

    const daysInCurMonth = numDaysMonthWise[curMonth];
    const lastDayOfCurMonth = new Date(
      `${curMonth + 1}/${daysInCurMonth}/${curYear}`
    ).getDay();
    const curMonthDates = range(1, daysInCurMonth).map((d) => {
      const date = new Date(`${curMonth + 1}/${d}/${curYear}`);

      return {
        date,
        disabled: false,
        ...rangeStartPartEndProps(date),
      };
    });
    // console.log(lastDayOfCurMonth);
    let nextMonth = curMonth + 1;
    let nextYear = curYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = curYear + 1;
    }
    let nextMonthDates: DateType[] = [];
    nextMonthDates = range(1, 6 - lastDayOfCurMonth).map((d) => {
      const date = new Date(`${nextMonth + 1}/${d}/${nextYear}`);
      return {
        date,
        disabled: true,
        ...rangeStartPartEndProps(date),
      };
    });

    setDates([...prevMonthDates, ...curMonthDates, ...nextMonthDates]);
  }, [curMonth, curYear, dateRange]);
  const prevMonth = () => {
    setCurMonth(curMonth - 1);
  };
  const nextMonth = () => {
    setCurMonth(curMonth + 1);
  };
  return (
    <div className={styles.DatePicker}>
      <div
        className="head"
        onClick={() => {
          if (pickerType === "start") {
            if (dateRange.start) {
              setCurMonth(dateRange.start.getMonth());
              setCurYear(dateRange.start.getFullYear());
            }
          } else {
            if (dateRange.end) {
              setCurMonth(dateRange.end.getMonth());
              setCurYear(dateRange.end.getFullYear());
            }
          }
        }}
      >
        {capitalize(pickerType)} Date:&nbsp;
        {pickerType === "start" ? dmy(dateRange.start) : dmy(dateRange.end)}
        &nbsp;
      </div>
      <div className="month">
        <div className="image" onClick={prevMonth}>
          <Image
            alt="icon"
            src="/icons/dashboard/prev.svg"
            width={9}
            height={9}
          />
        </div>
        <div className="text">
          <span
            ref={monthHeadRef}
            aria-controls="select-month"
            aria-haspopup="true"
            onClick={() => setSelectingMonth(true)}
          >
            {months[curMonth]}
            {monthSelectorType === "dropdown" && (
              <Image
                alt="icon"
                src="/icons/arrow-down.svg"
                width={15}
                height={15}
              />
            )}
          </span>
          <span
            ref={yearHeadRef}
            aria-controls="select-year"
            aria-haspopup="true"
            onClick={() => setSelectingYear(true)}
          >
            {curYear}
            {monthSelectorType === "dropdown" && (
              <Image
                alt="icon"
                src="/icons/arrow-down.svg"
                width={15}
                height={15}
              />
            )}
          </span>
        </div>
        {monthSelectorType === "dropdown" && (
          <Menu
            open={selectingMonth}
            id="select-month"
            anchorEl={monthHeadRef.current}
            onClose={() => {
              setSelectingMonth(false);
            }}
          >
            {months.map((month, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setCurMonth(i);
                  setSelectingMonth(false);
                }}
                selected={curMonth === i}
              >
                {month}
              </MenuItem>
            ))}
          </Menu>
        )}
        {monthSelectorType === "dropdown" && (
          <Menu
            open={selectingYear}
            id="select-year"
            anchorEl={yearHeadRef.current}
            onClose={() => {
              setSelectingYear(false);
            }}
          >
            {years.map((year, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setCurYear(year);
                  setSelectingYear(false);
                }}
                selected={curYear === year}
              >
                {year}
              </MenuItem>
            ))}
          </Menu>
        )}

        <div className="image" onClick={nextMonth}>
          <Image
            alt="icon"
            src="/icons/dashboard/next.svg"
            width={9}
            height={9}
          />
        </div>
      </div>

      <div
        className="days"
        {...useSwipeable({
          onSwipedLeft: nextMonth,
          onSwipedRight: prevMonth,
        })}
      >
        {days.map((day, i) => (
          <p className="dayname" key={i}>
            {day}
          </p>
        ))}
        {dates.map((date, i) => (
          <p
            key={i}
            className={classNames("date", date)}
            onClick={() => {
              // console.log(date.date);

              if (pickerType === "start") {
                if (
                  dateRange.end &&
                  compareOnlyDate(date.date, dateRange.end) > 0
                ) {
                  setDateRange((prev) => ({
                    start: prev.end,
                    end: date.date,
                  }));
                } else {
                  setDateRange((prev) => ({
                    ...prev,
                    start: date.date,
                  }));
                }
              } else if (pickerType === "end") {
                if (
                  dateRange.start &&
                  compareOnlyDate(date.date, dateRange.start) < 0
                ) {
                  setDateRange((prev) => ({
                    start: date.date,
                    end: prev.start,
                  }));
                } else {
                  setDateRange((prev) => ({
                    ...prev,
                    end: date.date,
                  }));
                }
              }
            }}
          >
            {date.date.getDate()}
          </p>
        ))}
      </div>
    </div>
  );
};
export default DatePicker;
const useStyles = makeStyles((theme) => ({
  DatePicker: {
    userSelect: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& .head": {
      fontSize: 18,
      fontWeight: 500,
      color: "#BDBDBD",
      marginBottom: "1rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0 1rem",
        color: "gray",
      },
      [theme.breakpoints.up("md")]: {
        "&:hover": {
          cursor: "pointer",
          color: "gray",
        },
      },
    },
    "& .month": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.only("sm")]: {
        padding: "0 3%",
      },

      "& .text": {
        display: "flex",
        gap: 10,
        "& span": {
          fontWeight: "bold",
          fontSize: 18,
          color: theme.palette.secondary.main,
          display: "flex",
          gap: 5,
        },
      },
      "& .image": {
        display: "flex",
        alignItems: "strech",
        justifyContent: "center",
        // border: "1px solid red",
        width: "3rem",
        height: 40,
        cursor: "pointer",

        [theme.breakpoints.up("md")]: {
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "#f1f1f199",
          },
        },
      },
    },
    "& .days": {
      margin: "2rem 0",
      // border: "1px solid red",
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      rowGap: 10,
      "& .dayname": {
        textAlign: "center",
        // border: "1px solid blue",
        fontSize: 14,
        [theme.breakpoints.up("md")]: {
          fontWeight: 600,
          color: theme.palette.secondary.main,
        },
      },
      "& .date": {
        padding: "6px 0",
        textAlign: "center",
        // border: "1px solid blue",
        fontWeight: 500,
        fontSize: 14,
        cursor: "pointer",
        "&.rangePartCapsule": {
          backgroundColor: "#F0F7FE",
        },
        "&.rangeStartCapsule, &.rangeEndCapsule": {
          color: "white",
          backgroundColor: theme.palette.secondary.main,
        },
        "&.rangeStartCapsule": {
          borderTopLeftRadius: 1000,
          borderBottomLeftRadius: 1000,
        },
        "&.rangeEndCapsule": {
          borderTopRightRadius: 1000,
          borderBottomRightRadius: 1000,
        },
        "&.disabled": {
          color: "#BDBDBD",
        },
      },
    },
  },
}));
