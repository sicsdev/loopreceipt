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
console.log(splitOnUpperCase("MyNameIsKhan"));
