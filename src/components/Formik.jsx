import { Formik, Form } from "formik";

import formFields from "../forms/demo/fields.json";

const initialValues = formFields.reduce((values, field) => {
  return { ...values, [field.name]: "" };
}, {});

const FormikWrapper = ({ children, onSubmit }) => {
  const formikProps = {
    initialValues,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form>{children}</Form>
    </Formik>
  );
};

export default FormikWrapper;
