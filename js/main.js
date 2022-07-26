import postApi from './api/postApi';

// console.log('hello word');
async function main() {
  const queryParam = {
    _page: 1,
    _limit: 5,
  };
  const response = await postApi.getAll(queryParam);
  console.log(response);
}

main();
