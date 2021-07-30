export const revertObject = (object: { [key: string]: string }) => {
  const revertedObject: typeof object = {};
  for (let [key, value] of Object.entries(object)) {
    revertedObject[value] = key;
  }
  return revertedObject;
};
const obj = {
  name: "Rahul",
  age: 20,
};
console.log(revertObject(obj));
