export const largestCommonSubstring = (s1: string, s2: string) => {
  // user.name must be first argument
  // since we return matchStartIndex of first string
  // string to array
  s1 = s1.toLowerCase();
  // console.log(s1);
  s2 = s2.toLowerCase();
  const arr1 = [];
  const arr2 = [];
  for (let e of s1) {
    arr1.push(e);
  }
  for (let e of s2) {
    arr2.push(e);
  }

  // define n x m sized array filled with 0's
  let matrix = [...Array(arr1.length + 1)].map((e) =>
    Array(arr2.length + 1).fill(0)
  );

  // fill the matrix
  let len = 0;
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        len = Math.max(matrix[i][j], len);
      }
    }
  }
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (matrix[i][j] === len) {
        return { matchLength: len, matchStartIndex: i - len };
      }
    }
  }
  return { matchLength: len, matchStartIndex: -1 };
};
export const getLastChar = (str: string) => {
  return str.slice(str.length - 1, str.length);
};
export const setLastChar = (str: string, v: string) => {
  const arr = str.split("");
  arr[arr.length - 1] = v;
  return arr.join("");
};
export const runSequentiallyAfterDelay = (
  funcArray: (() => void)[],
  delay: number
) => {
  for (let i = 0; i < funcArray.length; i++) {
    setTimeout(() => {
      funcArray[i]();
    }, delay * i);
  }
};
export const range = (min: number, max: number) => {
  const arr: number[] = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
};
export const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));
export const randomColor = (
  min: number = 0,
  max: number = 255,
  opacity: number = 1
) => {
  const r = randomBetween(min, max);
  const g = randomBetween(min, max);
  const b = randomBetween(min, max);
  const rgba = `rgba(${r},${g},${b}, ${opacity})`;
  return rgba;
};
export const capitalize = (value: string) => {
  return value[0].toUpperCase() + value.slice(1);
};
export class Debounce {
  callback;
  delay;
  timeOut: NodeJS.Timeout = setTimeout(() => {}, 0);
  constructor(callback: Function, delay: number) {
    this.callback = callback;
    this.delay = delay;
  }
  callAfterDelay(...args: any[]) {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => this.callback(...args), this.delay);
  }
  callImmediately(...args: any[]) {
    clearTimeout(this.timeOut);
    this.callback(...args);
  }
}
export const revertObject = (object: { [key: string]: string }) => {
  const revertedObject: typeof object = {};
  for (let [key, value] of Object.entries(object)) {
    revertedObject[value] = key;
  }
  return revertedObject;
};
export const splitOnUpperCase = (str: string) => {
  // str = "MyNameIsKhan"
  // returns "My Name Is Khan"
  let ans = "";
  let cur = "";
  for (let s of str.split("")) {
    if (/[A-Z]/.test(s)) {
      // encountered uppercase character
      ans += cur + " ";
      cur = s;
    } else {
      cur += s;
    }
  }
  ans += cur;
  return ans;
};
export const nToL = (str: string) => {
  // name to lable
  // str = "myNameIsKhan"
  // returns "My Name Is Khan"
  return splitOnUpperCase(capitalize(str));
};
