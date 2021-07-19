import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

const breakpoints: {
  [key in Breakpoint | "xxl"]: number;
} = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: Infinity,
};
const next: {
  [key in Breakpoint]: Breakpoint | "xxl";
} = {
  xs: "sm",
  sm: "md",
  md: "lg",
  lg: "xl",
  xl: "xxl",
};
export default {
  down: (key: Breakpoint | number) => {
    if (window) {
      if (typeof key === "string") {
        return window.innerWidth < breakpoints[next[key]];
      } else {
        return window.innerWidth < key;
      }
    }
    return false;
  },
  up: (key: Breakpoint | number) => {
    if (window) {
      if (typeof key === "string") {
        return window.innerWidth >= breakpoints[key];
      } else {
        return window.innerWidth >= key;
      }
    }
    return false;
  },
  between: (start: number | Breakpoint, end: number | Breakpoint) => {
    if (window) {
      if (typeof start === "string") {
        start = breakpoints[start];
      }
      if (typeof end === "string") {
        end = breakpoints[next[end]];
      }
      return window.innerWidth >= start && window.innerWidth < end;
    }
    return false;
  },
  only: (key: Breakpoint) => {
    if (window) {
      return (
        window.innerWidth >= breakpoints[key] &&
        window.innerWidth < breakpoints[next[key]]
      );
    }
    return false;
  },
  values: breakpoints,
};
