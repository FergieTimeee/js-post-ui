import postApi from './api/postApi';
import { initPostForm } from './utils';

//MAIN
(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');
    //   console.log(postId);
    const defaultValues = postId
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        };

    console.log('🚀 ~ file: add-edit-post.js ~ line 14 ~ defaultValue', defaultValues);
    console.log('mode', postId ? 'edit' : 'add');
    console.log('🚀 ~ file: add-edit-post.js ~ line 16 ~ postId', postId);
    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: (formValues) => console.log('submit'.formValues),
    });
  } catch (error) {
    console.log('🚀 ~ file: add-edit-post.js ~ line 23 ~ error', error);
  }
})();
