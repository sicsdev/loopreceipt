import React, {useState} from "react"
import { merge } from "lodash";
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false})
// import ReactApexChart from "react-apexcharts";
// material
import { Card, Typography, Box, TextField, InputAdornment, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//
import { BaseOptionChart } from "@components/charts";

// ----------------------------------------------------------------------

const CHART_FILTERS = [
  "This Week",
  "This Month",
  "This Year",
  "Last Year"
]

const CHART_DATA = [
  {
    name: "Outgoing Packages",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37],
  },
  {
    name: "Received Packages",
    type: "column",
    data: [44, 55, 41, 67, 22, 43, 21],
  },
];

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 15,
    lineHeight: '18px',
    letterSpacing: '0.01em',
    color: '#4F4F4F'
  },
  title1: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 28,
    lineHeight: '18px',
    letterSpacing: '0.01em',
    color: '#234361'
  },
  select: {
    '& .MuiInputAdornment-root > .MuiTypography-root': { fontSize: 12, alignSelf: "center" },
    '& .MuiInput-underline:before': { border: '0px !important'},
    '& .MuiInput-underline:after': { border: '0px !important'},
    '& .MuiSelect-root': { paddingLeft: 1, paddingTop: 0.5, paddingBottom: 0.5, paddingRight: '24px !important', fontSize: 12, color: "#6A707E", border: '0 !important' },
  }
}));

export default function PackageAnalytics() {
  const classes = useStyles()
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { borderRadius: 4 } },
    fill: { type: ["solid", "solid"] },
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
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
  const [seriesData, setSeriesData] = useState("This Week");
  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(String(event.target.value));
  };

  return (
    <Card style={{height: 344, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)"}}>
      {/* <CardHeader title="3,123" subheader="Total Packages" /> */}
      <Box display="flex" sx={{px: 3, py: 2, marginBottom: "1px solid #EBEFF2"}}>
        <Typography className={classes.title}>Total Packages</Typography>
        
        <TextField
            select
            value={seriesData}
            onChange={handleChangeSeriesData}
            InputProps={{
              startAdornment: <InputAdornment position="start">Show: </InputAdornment>,
            }}
            className={classes.select}
            style={{
              marginRight: 0,
              marginLeft: 'auto',
              border: '0 !important',
            }}
          >
            {CHART_FILTERS.map((option) => (
              <MenuItem key={option} value={option}>
              {option}
              </MenuItem>
            ))}
          </TextField>
      </Box>
      <Box display="flex" sx={{px: 3, pb: 2, marginBottom: "1px solid #EBEFF2"}}>
        <Typography className={classes.title1}>3,123</Typography>
      </Box>
      <Box sx={{ px: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={240}
        />
      </Box>
    </Card>
  );
}
