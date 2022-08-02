export function initPostForm(formId, defaultValues, onSubmit) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValues(form, defaultValues);
}
