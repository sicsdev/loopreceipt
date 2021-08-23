import React, { useState, useEffect } from "react";
import { merge } from "lodash";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
// import ReactApexChart from "react-apexcharts";
// material
import {
  Card,
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
//
import { BaseOptionChart } from "@components/charts";
import analyticsApi from "@apiClient/analyticsApi";
// ----------------------------------------------------------------------

const CHART_FILTERS = [
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
  { label: "This Year", value: "yearly" },
];

type labelOptions = {
  [key: string]: string[];
};

const LABELS: labelOptions = {
  weekly: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
  monthly: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  yearly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

type dataType = {
  name: string;
  type: string;
  data: number[] | undefined | null;
};

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
  chartBox: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0,
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 24,
      marginRight: 24,
    },
  },
}));

const CHART_HEIGHT = 290;
const LEGEND_HEIGHT = 32;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  // marginTop: theme.spacing(2),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
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

export default function LoopAnalytics() {
  const theme = useTheme();
  const classes = useStyles();
  const [data, setData] = useState<dataType[]>([
    {
      name: "Singles",
      type: "line",
      data: [],
    },
    {
      name: "Groups",
      type: "area",
      data: [],
    },
  ]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [range, setRange] = useState("weekly");
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRange(String(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 3] },
    fill: { type: ["solid", "gradient"] },
    legend: { floating: true, horizontalAlign: "center", position: "bottom" },
    labels: LABELS[range],
    colors: [
      // "#E0E0E0",
      "#234361",
      theme.palette.primary.main,

      // theme.palette.warning.main,
    ],
    xaxis: { type: "category" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  const getPackagesMode = async () => {
    let response = await analyticsApi.packagesMode(range);
    if (response.error === false) {
      let singles = [];
      let groups = [];
      let total = 0;

      if (response.data.single) {
        for (let k in response.data.single) {
          let value = response.data.single[k];
          singles.push(value);
          total = total + value;
        }
      }
      if (response.data.group) {
        for (let k in response.data.group) {
          let value = response.data.group[k];
          groups.push(value);
          total = total + value;
        }
      }

      setData([
        { name: "Singles", type: "line", data: singles },
        { name: "Groups", type: "area", data: groups },
      ]);
      setTotalPackages(total);
    }
  };
  useEffect(() => {
    getPackagesMode();
  }, [range]);

  return (
    <Card
      style={{ height: 344, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)" }}
    >
      <Box
        display="flex"
        sx={{ px: 3, py: 2, borderBottom: "1px solid #EBEFF2" }}
      >
        <Typography className={classes.title}>Loops</Typography>

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
      <Box className={classes.chartBox} dir="ltr">
        <ChartWrapperStyle>
          <ReactApexChart
            type="line"
            series={data}
            options={chartOptions}
            height={260}
          />
        </ChartWrapperStyle>
      </Box>
    </Card>
  );
}
