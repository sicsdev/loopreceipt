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
export default class Win {
  windowD:
    | {
        innerWidth: number;
        innerHeight: number;
      }
    | undefined = undefined;
  constructor(windowDimensions: { innerWidth: number; innerHeight: number }) {
    this.windowD = windowDimensions;
  }
  values = breakpoints;
  down(key: Breakpoint | number) {
    if (this.windowD) {
      if (typeof key === "string") {
        return this.windowD.innerWidth < breakpoints[next[key]];
      } else {
        return this.windowD.innerWidth < key;
      }
    }
    return false;
  }
  up(key: Breakpoint | number) {
    if (this.windowD) {
      if (typeof key === "string") {
        return this.windowD.innerWidth >= breakpoints[key];
      } else {
        return this.windowD.innerWidth >= key;
      }
    }
    return false;
  }
  between(start: number | Breakpoint, end: number | Breakpoint) {
    if (this.windowD) {
      if (typeof start === "string") {
        start = breakpoints[start];
      }
      if (typeof end === "string") {
        end = breakpoints[next[end]];
      }
      return this.windowD.innerWidth >= start && this.windowD.innerWidth < end;
    }
    return false;
  }
  only(key: Breakpoint) {
    if (this.windowD) {
      return (
        this.windowD.innerWidth >= breakpoints[key] &&
        this.windowD.innerWidth < breakpoints[next[key]]
      );
    }
    return false;
  }
}
