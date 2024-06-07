import Cookies from "js-cookie";

const setData = (key, value) => {
  Cookies.set(key, value, { expires: 1 });
};

const getData = (key) => {
  return Cookies.get(key);
}

const removeData = (key) => {
  Cookies.remove(key);
}

const cookie = { setData, getData, removeData };

export default cookie;