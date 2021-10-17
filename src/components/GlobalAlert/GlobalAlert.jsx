import React from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import { useGlobalAlert } from "./GlobalAlertContext";

const Container = styled.div`
  position: absolute;
  transform: translateY(-100%);
  margin: 0.5rem;
  top: -1rem;
  width: calc(100% - 1rem);
`;

const GlobalAlert = () => {
  const { alertProps, showAlert, closeAlert } = useGlobalAlert();
  const { severity, content, closable, closeAfterDelay } = alertProps;

  React.useEffect(() => {
    if (showAlert && closeAfterDelay) {
      setTimeout(() => {
        closeAlert();
      }, 10000);
    }
  }, [showAlert, closeAfterDelay]);

  return (
    showAlert && (
      <Container>
        <Alert severity={severity} onClose={closable ? closeAlert : undefined}>
          {content}
        </Alert>
      </Container>
    )
  );
};

export default GlobalAlert;
