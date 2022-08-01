import axiosClient from './axiosClient';

// import : default import named import
//export: default export ,maned export
// default : can use  your name --> have one default export ONLY
// name export: use exactly name --> have multiple export

// const cityApi = {
export function getAllCities(params) {
  const url = '/cities';
  return axiosClient.get(url, { params });
}

export function getCityById(id) {
  const url = `/cities/${id}`;
  return axiosClient.get(url);
}
//   add(data) {
//     const url = `/cities/`;
//     return axiosClient.post(url, data);
//   },

//   update(data) {
//     const url = `/cities/${data.id}`;
//     return axiosClient.patch(url, data);
//   },

//   remove(id) {
//     const url = `/cities/${id}`;
//     return axiosClient.delete(url);
//   },
// };

// export default cityApi;
