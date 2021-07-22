const largestCommonSubstring = (s1, s2) => {
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
        let matchedString = s1.slice(i - len, i);
        return matchedString;
      }
    }
  }
};
console.log(largestCommonSubstring("321", "mehakguta"));
