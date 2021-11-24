import * as Yup from 'yup';

const mailContextValidator = Yup.object({
  template: Yup.string().required('The template field is required.'),
  locale: Yup.string().required('The locale field is required.'),
  email: Yup.string().required('The email field is required.'),
});

export default mailContextValidator;
