import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { useFormikContext } from "formik";

import submissionTemplate from "../forms/demo/template.txt";
import TextBlock from "../components/TextBlock";
import { useGlobalAlert } from "../components/GlobalAlert";

const Container = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
`;

const SubmissionContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  margin: 1rem 0;
`;

const CenteredText = styled.div`
  text-align: center;
`;

const editAlerts = [
  "You're making the dolphins happy by personalising!",
  "Amazing, you're riding the wave of success!",
  "You're a super star!",
];

const SubmissionScreen = ({ show }) => {
  const formik = useFormikContext();
  const [text, setText] = React.useState("");
  fetch(submissionTemplate)
    .then((response) => response.text())
    .then((textContent) => {
      setText(textContent);
    });

  const { triggerAlert } = useGlobalAlert();
  const [editCount, setEditCount] = React.useState(0);
  const alertCooldown = React.useRef(false);

  const onEdit = () => {
    if (!alertCooldown.current) {
      alertCooldown.current = true;
      setTimeout(() => {
        alertCooldown.current = false;
      }, 5000);
      const alertProps = {
        severity: "success",
        closable: true,
        closeAfterDelay: true,
        content: editAlerts[editCount],
      };
      triggerAlert(alertProps);
      setEditCount(editCount + 1);
    }
  };

  return (
    <Container show={show}>
      <h1>Edit your submission</h1>
      {formik.values.firstName && <p>{`Hey ${formik.values.firstName}!`}</p>}
      <p>
        Click anywhere on the letter below to edit it. The more personalised it
        is, the better!
      </p>
      <SubmissionContent>
        {text
          .split("\n")
          .map((text, index) =>
            text ? (
              <TextBlock key={index} template={text} onChange={onEdit} />
            ) : (
              <p key={index}></p>
            )
          )}
      </SubmissionContent>
      <CenteredText>
        <p>You're a legend for making it this far!</p>
        <p>
          All you need to do is copy paste the above text into your email and
          send it off to git.hackathon@demo.com
        </p>
      </CenteredText>
      <Button variant="contained" endIcon={<ContentCopy />}>
        Copy your submission
      </Button>
    </Container>
  );
};

export default SubmissionScreen;
