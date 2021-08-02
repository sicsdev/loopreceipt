import React, {useState} from "react";
import { merge } from "lodash";
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false})
// import ReactApexChart from "react-apexcharts";
// material
import { Card, Box, Typography, TextField, InputAdornment, MenuItem } from "@material-ui/core";
import { useTheme, makeStyles, styled } from "@material-ui/core/styles";
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
    name: "Singles",
    type: "line",
    data: [48, 60, 45, 70, 33, 45, 37, 48, 60, 32, 50],
  },
  {
    name: "Groups",
    type: "area",
    data: [40, 50, 35, 60, 20, 43, 21, 41, 56, 27, 43],
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
  select: {
    '& .MuiInputAdornment-root > .MuiTypography-root': { fontSize: 12, alignSelf: "center" },
    '& .MuiInput-underline:before': { border: '0px !important'},
    '& .MuiInput-underline:after': { border: '0px !important'},
    '& .MuiSelect-root': { paddingLeft: 1, paddingTop: 0.5, paddingBottom: 0.5, paddingRight: '24px !important', fontSize: 12, color: "#6A707E", border: '0 !important' },
  }
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
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 3] },
    fill: { type: ["solid", "gradient"] },
    legend: { floating: true, horizontalAlign: "center", position: "bottom" },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
      "08/01/2003",
      "09/01/2003",
      "10/01/2003",
      "11/01/2003",
    ],
    colors: [
      // "#E0E0E0",
      "#234361",
      theme.palette.primary.main,

      // theme.palette.warning.main,
    ],
    xaxis: { type: "datetime" },
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
      <Box display="flex" sx={{px: 3, py: 2, borderBottom: "1px solid #EBEFF2"}}>
        <Typography className={classes.title}>Loops</Typography>

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
      <Box sx={{ px: 2, pb: 1 }} dir="ltr">
        <ChartWrapperStyle>
          <ReactApexChart
            type="line"
            series={CHART_DATA}
            options={chartOptions}
            height={260}
          />
        </ChartWrapperStyle>
      </Box>
    </Card>
  );
}
