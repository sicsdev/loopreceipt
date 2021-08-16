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
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  weekly: ["Sun", "Tues", "Wed", "Thurs", "Fri", "Sat", "Mon"],
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
  title1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 28,
    lineHeight: "18px",
    letterSpacing: "0.01em",
    color: "#234361",
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

export default function PackageAnalytics() {
  const classes = useStyles();
  const [data, setData] = useState<dataType[]>([
    {
      name: "Outgoing Packages",
      type: "column",
      data: [],
    },
    {
      name: "Received Packages",
      type: "column",
      data: [],
    },
  ]);
  const [totalPackages, setTotalPackages] = useState(0);
  const [range, setRange] = useState("weekly");
  const handleChangeRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRange(String(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { borderRadius: 4 } },
    fill: { type: ["solid", "solid"] },
    labels: LABELS[range],
    xaxis: { type: "category" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  const getPackages = async () => {
    let response = await analyticsApi.packagesSentReceived(range);
    if (response.error === false) {
      let outgoing = [];
      let received = [];
      let total = 0;

      if (response.data.sent) {
        for (let k in response.data.sent) {
          let value = response.data.sent[k];
          outgoing.push(value);
          total = total + value;
        }
      }
      if (response.data.received) {
        for (let k in response.data.received) {
          let value = response.data.received[k];
          received.push(value);
          total = total + value;
        }
      }

      setData([
        { name: "Outgoing Packages", type: "column", data: outgoing },
        { name: "Received Packages", type: "column", data: received },
      ]);
      setTotalPackages(total);
    }
  };
  useEffect(() => {
    getPackages();
  }, [range]);

  return (
    <Card
      style={{ height: 344, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)" }}
    >
      {/* <CardHeader title="3,123" subheader="Total Packages" /> */}
      <Box
        display="flex"
        sx={{ px: 3, py: 2, marginBottom: "1px solid #EBEFF2" }}
      >
        <Typography className={classes.title}>Total Packages</Typography>

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
      <Box
        display="flex"
        sx={{ px: 3, pb: 2, marginBottom: "1px solid #EBEFF2" }}
      >
        <Typography className={classes.title1}>{totalPackages}</Typography>
      </Box>
      <Box sx={{ px: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={data}
          options={chartOptions}
          height={240}
        />
      </Box>
    </Card>
  );
}
