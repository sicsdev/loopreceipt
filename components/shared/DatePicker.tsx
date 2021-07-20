import { days } from "@helpers/date";
import { range } from "@helpers/utils";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
interface DatePickerProps {}
const DatePicker = ({}: DatePickerProps) => {
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
  return (
    <div className={styles.DatePicker}>
      <div className="month">
        <Image src="/icons/dashboard/prev.svg" width={9} height={9} />
        <p className="text">
          March 2021{" "}
          <Image src="/icons/arrow-down.svg" width={15} height={15} />
        </p>
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
    "& .month": {
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
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
