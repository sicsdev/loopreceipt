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
