import * as React from "react";
import styled from "styled-components";
import { useFormikContext } from "formik";
import { render } from "mustache";
import TextArea from "react-textarea-autosize";

const EditableText = styled(TextArea)`
  margin: 0.25rem;
  min-height: 1rem;
  resize: none;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.75rem;
`;

const extractNamesFromTemplate = (template) =>
  template?.match?.(/{{\s*[\w.]+\s*}}/g)?.map((x) => x.match(/[\w.]+/)[0]) ||
  [];

const TextBlock = (props) => {
  const { template, onChange: onChangeFromProps } = props;
  const formik = useFormikContext();

  const [showText, setShowText] = React.useState(false);
  const [names, setNames] = React.useState([]);
  const [text, setText] = React.useState(template);
  const previousValues = React.useRef([]);

  React.useEffect(() => {
    const namesInTemplate = extractNamesFromTemplate(template);
    setNames(namesInTemplate);
  }, [template]);

  React.useEffect(() => {
    const values = names.map((name) => formik.values[name]);
    const noEmptyFields = values.filter(Boolean).length === values.length;

    if (noEmptyFields && !showText) {
      setShowText(true);
    } else if (!noEmptyFields) {
      setShowText(false);
    }
  }, [showText, names, formik]);

  React.useEffect(() => {
    const values = names.map((name) => formik.values[name]);
    const valuesChanged =
      values.length !== previousValues.current.length ||
      values.reduce(
        (changed, value, index) =>
          changed || value !== previousValues.current[index],
        false
      );

    if (names.length && valuesChanged) {
      const interpolatedText = render(template, formik.values);
      setText(interpolatedText);
      previousValues.current = values;
    }
  }, [template, names, formik]);

  const handleManualChange = (e) => {
    setText(e.target.value);
    onChangeFromProps();
  };

  return showText ? (
    <EditableText value={text} onChange={handleManualChange} />
  ) : null;
};

export default TextBlock;
