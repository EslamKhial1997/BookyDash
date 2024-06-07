export const filterRequest = (filter) => {
  let str = "";
  for (let prop in filter) {
    str += `&${prop}=${filter[prop]}`;
  }
  return str;
}