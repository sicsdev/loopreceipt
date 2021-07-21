import { days, months } from "@helpers/date";
import { range } from "@helpers/utils";
import { makeStyles, MenuItem, Menu } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useRef, useState } from "react";
export interface DatePickerProps {
  monthSelectorType: "dropdown" | "table";
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
const DatePicker = ({
  monthSelectorType,
  selectedDate,
  setSelectedDate,
}: DatePickerProps) => {
  const [dates, setDates] = useState(() => {
    const prevMonthDates = range(27, 31).map((d) => {
      return {
        d,
        disabled: true,
        rangeStartCapsule: false,
        rangePartCapsule: false,
        rangeEndCapsule: false,
      };
    });
    const curMonthDates = range(1, 30).map((d) => {
      return {
        d,
        disabled: false,
        rangeStartCapsule: false,
        rangePartCapsule: false,
        rangeEndCapsule: false,
      };
    });
    curMonthDates[0].rangeStartCapsule = true;
    curMonthDates[1].rangePartCapsule = true;
    curMonthDates[2].rangePartCapsule = true;
    curMonthDates[3].rangePartCapsule = true;
    curMonthDates[4].rangeEndCapsule = true;
    return [...prevMonthDates, ...curMonthDates];
  });
  const styles = useStyles();
  const monthHeadRef = useRef<HTMLDivElement>(null);
  const [selectingMonth, setSelectingMonth] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    months[selectedDate.getMonth()]
  );
  return (
    <div className={styles.DatePicker}>
      <div className="month">
        <Image src="/icons/dashboard/prev.svg" width={9} height={9} />
        <div
          className="text"
          ref={monthHeadRef}
          aria-controls="select-month"
          aria-haspopup="true"
          onClick={() => setSelectingMonth(true)}
        >
          {selectedMonth + " " + selectedDate.getFullYear()}
          {/* pending */}
          {/* {monthSelectorType === "dropdown" && (
            <Image src="/icons/arrow-down.svg" width={15} height={15} />
          )} */}
        </div>
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
                setSelectedMonth(month);
                setSelectingMonth(false);
              }}
              selected={selectedMonth === month}
            >
              {month}
            </MenuItem>
          ))}
        </Menu>
        <Image src="/icons/dashboard/next.svg" width={9} height={9} />
      </div>
      <div className="days">
        {days.map((day, i) => (
          <p className="dayname" key={i}>
            {day}
          </p>
        ))}
        {dates.map((date, i) => (
          <p key={i} className={classNames("date", date)}>
            {date.d}
          </p>
        ))}
      </div>
    </div>
  );
};
export default DatePicker;
const useStyles = makeStyles((theme) => ({
  DatePicker: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& .month": {
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
        padding: "0 1rem",
      },
      "& .text": {
        fontWeight: "bold",
        fontSize: 18,
        color: theme.palette.secondary.main,
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
        "&.disabled": {
          color: "#BDBDBD",
        },
        "&.rangeStartCapsule, &.rangeEndCapsule": {
          color: "white",
          backgroundColor: theme.palette.secondary.main,
        },
        "&.rangePartCapsule": {
          backgroundColor: "#F0F7FE",
        },
        "&.rangeStartCapsule": {
          borderTopLeftRadius: 1000,
          borderBottomLeftRadius: 1000,
        },
        "&.rangeEndCapsule": {
          borderTopRightRadius: 1000,
          borderBottomRightRadius: 1000,
        },
      },
    },
  },
}));
