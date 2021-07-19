export const largestCommonSubsequence = (s1: string, s2: string) => {
  // string to array
  s1 = s1.toLowerCase();
  // console.log(s1);
  s2 = s2.toLowerCase();
  const arr1: string[] = [];
  const arr2: string[] = [];
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
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
  }
  //   console.log(matrix);
  // return the max which is at the right bottom corner of the matrix
  return matrix[matrix.length - 1][matrix[0].length - 1];
};
// console.log(largestCommonSubsequence("rahul", "mehak"));
export const largestCommonSubstring = (s1: string, s2: string) => {
  // string to array
  s1 = s1.toLowerCase();
  // console.log(s1);
  s2 = s2.toLowerCase();
  const arr1: string[] = [];
  const arr2: string[] = [];
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
  let ans = 0;
  for (let i = 1; i <= arr1.length; i++) {
    for (let j = 1; j <= arr2.length; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
        ans = Math.max(matrix[i][j], ans);
      }
    }
  }
  return ans;
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
