export const deferrer = (func: Function, ...prevargs: any) => {
  return (...args: any) => {
    return func(...prevargs, ...args);
  };
};
console.log("practice");
function add(a: number, b: number) {
  return a + b;
}
const d = deferrer(add, 1, 2);
console.log(d());
