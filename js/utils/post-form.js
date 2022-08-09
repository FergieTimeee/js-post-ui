import { setBackgroundImage, setFieldValue, setTextContent } from './common';
import * as yup from 'yup';
function setFormValues(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title);
  setFieldValue(form, '[name="author"]', formValues?.author);
  setFieldValue(form, '[name="description"]', formValues?.description);
  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl);

  setBackgroundImage(document, 'postHeroImage', formValues?.imageUrl);
}

function getFormValues(form) {
  if (!form) return;
  const formValues = {};
  //S1 :query each input  and add to values object
  // ['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`);
  //   if (field) formValues[name] = field.value;
  // });

  //s2 using form data
  const data = new FormData(form);
  for (const [key, value] of data) {
    formValues[key] = value;
  }
  return formValues;
}

// function getTitleError(from) {
//   const titleElement = from.querySelector('[name="title"]');
//   // console.log(titleElement);
//   if (!titleElement) return;
//   //required
//   if (titleElement.validity.valueMissing) return 'Please enter title';
//   //at least two words
//   if (titleElement.value.split(' ').filter((x) => !!x && x.length >= 3).length < 2)
//     return 'Please enter at least two words';
//   return '';
// }

function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter title'),
    author: yup
      .string()
      .required('Please enter author')
      .test(
        'at-least-two-words',
        'Please enter at least two words',
        (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
      ),
    description: yup.string(),
  });
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (!element) return;

  element.setCustomValidity(error);
  setTextContent(element.parentElement, '.invalid-feedback', error);
}

async function validatePostForm(form, formValues) {
  // //get errors
  // const error = {
  //   title: getTitleError(form),
  //   //author: getAuthorError(form)
  // };

  // //setError
  // for (const key in error) {
  //   const element = form.querySelector(`[name="${key}"]`);
  //   if (!element) return;

  //   element.setCustomValidity(error[key]);
  //   setTextContent(element.parentElement, '.invalid-feedback', error[key]);
  // }

  // //add was-validated class to form element
  // const isValid = form.checkValidity();
  // if (!isValid) return form.classList.add('was-validated');

  // return isValid;
  try {
    //reset previous errors
    ['title', 'author'].forEach((name) => setFieldError(form, name, ''));

    const schema = getPostSchema();
    await schema.validate(formValues, { abortEarly: false });
  } catch (error) {
    console.log(error.name);
    console.log(error.inner);
    const errorLog = {};

    if (error.name === 'ValidationError')
      for (const validationError of error.inner) {
        const name = validationError.path;
        console.log(name);

        if (errorLog[name]) continue;

        //set field error and mark  as logged
        setFieldError(form, name, validationError.message);

        errorLog[name] = true;
      }
  }

  //add was-validated class to form element
  const isValid = form.checkValidity();
  if (!isValid) return form.classList.add('was-validated');

  return isValid;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  console.log('🚀 ~ file: post-form.js ~ line 5 ~ initPostForm ~ form', form);
  if (!form) return;
  setFormValues(form, defaultValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    //get form values
    const formValues = getFormValues(form);
    // console.log(formValues);
    //validation
    // if valid trigger submit callback
    // otherwise ,show validation error
    if (!validatePostForm(form, formValues)) return;
  });
}
