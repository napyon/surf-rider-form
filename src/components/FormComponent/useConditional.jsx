import React from "react";
import { useFormikContext } from "formik";

const useConditional = (props) => {
  const { conditional = {}, name } = props;
  const formik = useFormikContext();
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (conditional.condition === "equals") {
      setShow(formik.values[conditional.when] === conditional.value);
    }
  }, [formik, conditional]);

  React.useEffect(() => {
    if (!show && formik.values[name]) {
      formik.setFieldValue(name, undefined);
    }
  }, [show, name, formik]);

  return show;
};

export default useConditional;
