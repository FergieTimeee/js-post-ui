<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
import axiosCline from './api/axiosClient';

console.log('hello word');

async function main() {
  const response = await axiosCline.get('/posts');
  console.log(response);
}
main();
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
