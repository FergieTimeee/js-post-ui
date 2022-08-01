import postApi from './api/postApi';
import { getAllCities, getCityById } from './api/cityApi';
// console.log('hello word');
async function main() {
  try {
    const queryParam = {
      _page: 1,
      _limit: 5,
    };
    const data = await postApi.getAll(queryParam);
    console.log(data);
  } catch (error) {
    console.log('🚀 ~ file: main.js ~ line 13 ~ main ~ error', error);
  }

  await postApi.updateFromData({
    id: 'sktwi1cgkkuif36do',
    title: 'một nhà',
  });
}

main();
