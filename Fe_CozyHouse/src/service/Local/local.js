let local = {};
local.get = (key) => {
  let t = localStorage.getItem(key);
  return t;
  // try {
  //     return JSON.parse(t);
  // } catch (err) {
  //     return t;
  // }
};
local.set = (key, val) => {
  localStorage.setItem(key, val);
};
local.clear = () => {
  localStorage.clear();
};
export default local;
