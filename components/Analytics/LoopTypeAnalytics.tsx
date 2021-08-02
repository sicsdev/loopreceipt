import React, {useState} from "react";
import { merge } from "lodash";
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr:false})
// import ReactApexChart from "react-apexcharts";
// material
import {
  useTheme,
  styled,
  makeStyles
} from "@material-ui/core/styles";
import { Card, Typography, Box, TextField, InputAdornment, MenuItem } from "@material-ui/core";
// utils
import { fNumber } from "../../utils/formatNumber";
//
import { BaseOptionChart } from "@components/charts";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 260;
const LEGEND_HEIGHT = 72;

const CHART_FILTERS = [
  "This Week",
  "This Month",
  "This Year",
  "Last Year"
]

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(3),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important" as "relative",
    marginTop: theme.spacing(2),
    // borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [415, 213];

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

export default function LoopTypeAnalytics() {
  const theme = useTheme();
  const classes = useStyles()

  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#234361", theme.palette.primary.main],
    labels: ["Internal", "External"],
    stroke: { colors: [theme.palette.background.paper] },
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
      pie: {
        donut: {
          size: "80%",
          labels: {
            value: {
              formatter: (val: number | string) => fNumber(val),
            },
            total: {
              formatter: (w: { globals: { seriesTotals: number[] } }) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
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
        <Typography className={classes.title}>Type of Loops</Typography>

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
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="donut"
          series={CHART_DATA}
          options={chartOptions}
          height={240}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
