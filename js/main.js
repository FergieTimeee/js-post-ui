<<<<<<< Updated upstream
console.log("hello word");
=======
import postApi from './api/postApi';

// console.log('hello word');
async function main() {
  try {
    const queryParam = {
      _page: 1,
      _limit: 5,
    };
    const response = await postApi.getAll(queryParam);
    console.log(response);
  } catch (error) {}

  await postApi.updateFromData({
    id: 'sktwi1cgkkuif36do',
    title: 'một nhà',
  });
}

main();
>>>>>>> Stashed changes
