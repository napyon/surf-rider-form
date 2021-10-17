import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

import formFields from "../forms/demo/fields.json";
import FormComponent from "../components/FormComponent";
import { useGlobalAlert } from "../components/GlobalAlert";

const Container = styled.div`
  ${({ show }) => (show ? "" : "display: none;")}
`;

const CenteredText = styled.div`
  text-align: center;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 1.5rem;
  }
`;

const FormScreen = ({ show }) => {
  const { triggerAlert } = useGlobalAlert();
  const firstBlurOccurred = React.useRef(false);

  const onFieldBlur = () => {
    if (!firstBlurOccurred.current) {
      firstBlurOccurred.current = true;
      const alertProps = {
        severity: "info",
        closable: true,
        closeAfterDelay: false,
        content: "Try clicking on the bottom right icon to see your progress",
      };
      triggerAlert(alertProps);
    }
  };

  return (
    <Container show={show}>
      <h1>Submission generator</h1>
      <p>Answer the questions below to generate your submission.</p>
      <FieldsContainer>
        {formFields.map((fieldProps) => (
          <FormComponent
            key={fieldProps.name}
            {...fieldProps}
            onBlur={onFieldBlur}
          />
        ))}
        <Button variant="contained" type="submit">
          Review your submission
        </Button>
      </FieldsContainer>
    </Container>
  );
};

export default FormScreen;
