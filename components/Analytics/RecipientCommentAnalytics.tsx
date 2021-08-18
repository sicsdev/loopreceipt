import React, { useState, useEffect } from "react";
import { merge } from "lodash";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
// utils
import { fNumber } from "../../utils/formatNumber";
//
import { BaseOptionChart } from "@components/charts";
// import { makeStyles } from "@material-ui/styles";
import analyticsApi from "@apiClient/analyticsApi";
// ----------------------------------------------------------------------

const CHART_HEIGHT = 200;
const LEGEND_HEIGHT = 0;

const CHART_FILTERS = [
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
  { label: "This Year", value: "yearly" },
];

const happyProgress = "/icons/analytics/happyProgress.svg";

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  // marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: `${CHART_HEIGHT} !important` },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important" as "relative",
    // borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

// const CHART_DATA = [80];

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 15,
    lineHeight: "18px",
    letterSpacing: "0.01em",
    color: "#4F4F4F",
  },
  headingStyle: {
    fontWeight: 700,
    fontFamily: "Roboto",
    letterSpacing: "0.03em",
    textAlign: "center",
    color: "#3F865A",
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
      lineHeight: "18px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 16,
      lineHeight: "18px",
    },
  },
  percentageStyle: {
    color: "#000",
    fontWeight: 500,
    fontFamily: "Roboto",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 25,
      lineHeight: "30px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
      lineHeight: "35px",
    },
  },
  bodyStyle: {
    color: "#000",
    fontFamily: "Roboto",
    textAlign: "left",
    alignSelf: "center",
    marginLeft: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: 12,
      lineHeight: "18px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
      lineHeight: "18px",
    },
  },
  text: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 10,
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 10,
    },
  },
  select: {
    "& .MuiInputAdornment-root > .MuiTypography-root": {
      fontSize: 12,
      alignSelf: "center",
    },
    "& .MuiInput-underline:before": { border: "0px !important" },
    "& .MuiInput-underline:after": { border: "0px !important" },
    "& .MuiSelect-root": {
      paddingLeft: 1,
      paddingTop: 0.5,
      paddingBottom: 0.5,
      paddingRight: "24px !important",
      fontSize: 12,
      color: "#6A707E",
      border: "0 !important",
    },
  },
}));

export default function RecipientCommentAnalytics() {
  const theme = useTheme();
  const classes = useStyles();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main],
    stroke: { colors: [theme.palette.background.paper] },
    labels: ["Recipient Comment Percentage"],
    legend: { floating: true, horizontalAlign: "center" },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: string) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "75%",
          image: happyProgress,
          imageWidth: 84,
          imageHeight: 84,
          imageClipped: false,
        },
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "20%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    // grid: {
    //   padding: {
    //     top: -100,
    //   },
    // },
  });

  const [percent, setPercent] = useState([0]);
  const [range, setRange] = useState("weekly");
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRange(String(event.target.value));
  };

  const getCommentsPercentage = async () => {
    let response = await analyticsApi.commentsReceived(range);
    if (response.error === false && response.percent) {
      setPercent([response.percent]);
    } else {
      setPercent([0]);
    }
  };
  useEffect(() => {
    getCommentsPercentage();
  }, [range]);

  return (
    <Card
      style={{ height: 344, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)" }}
    >
      <Box
        display="flex"
        sx={{ px: 3, py: 2, borderBottom: "1px solid #EBEFF2" }}
      >
        <Typography className={classes.title}>Recipient Comments</Typography>

        <TextField
          select
          value={range}
          onChange={handleChangeRange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Show: </InputAdornment>
            ),
          }}
          className={classes.select}
          style={{
            marginRight: 0,
            marginLeft: "auto",
            border: "0 !important",
          }}
        >
          {CHART_FILTERS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="radialBar"
          series={percent}
          options={chartOptions}
          height={240}
        />
        <Box>
          <Typography className={classes.headingStyle}>Superb!</Typography>
        </Box>
        <div style={{ display: "flex" }} className={classes.text}>
          <Typography className={classes.percentageStyle}>
            {Math.trunc(percent[0])}%
          </Typography>
          <Typography className={classes.bodyStyle}>
            of recipients left a comment on delivery
          </Typography>
        </div>
      </ChartWrapperStyle>
    </Card>
  );
}
