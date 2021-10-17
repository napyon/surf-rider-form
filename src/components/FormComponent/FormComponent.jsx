import { useFormikContext } from "formik";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import styled from "styled-components";
import useConditional from "./useConditional";

const StyledFormControl = styled(FormControl)`
  legend {
    margin-bottom: 1rem;
  }
`;

const FormComponent = (props) => {
  const formik = useFormikContext();
  const show = useConditional(props);
  if (!show) {
    return null;
  }

  const { type, label, name, onBlur: onBlurFromProps } = props;

  const propsForField = {
    label,
    name,
    id: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    onBlur: (...args) => {
      formik.handleBlur(...args);
      onBlurFromProps(...args);
    },
  };

  if (type === "textfield") {
    return <TextField {...propsForField} />;
  }
  if (type === "textarea") {
    return <TextField multiline rows={3} {...propsForField} />;
  }
  if (type === "radio") {
    const { values } = props;

    return (
      <StyledFormControl component="fieldset">
        <FormLabel component="legend">{propsForField.label}</FormLabel>
        <RadioGroup
          name={propsForField.name}
          value={propsForField.value}
          onChange={propsForField.onChange}
        >
          {values.map((radioButton) => (
            <FormControlLabel
              key={radioButton.label}
              value={radioButton.value}
              label={radioButton.label}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      </StyledFormControl>
    );
  }

  return <p>Unknown field type</p>;
};

export default FormComponent;
