import React from "react";
import styled from "styled-components";
import { ThemeProvider, createMuiTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BallotIcon from "@mui/icons-material/Ballot";
import ArticleIcon from "@mui/icons-material/Article";

import FormScreen from "./screens/Form";
import SubmissionScreen from "./screens/Submission";
import Formik from "./components/Formik";
import GlobalAlert, {
  GlobalAlertProvider,
  useGlobalAlert,
} from "./components/GlobalAlert";
import logo from "./images/logo.png";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Telegraf",
  },
});

const Screen = {
  Form: 0,
  Submission: 1,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  .MuiTabs-root {
    border-top: 1px solid lightgrey;
  }

  h1 {
    line-height: 1.3;
  }
`;

const Content = styled.div`
  height: 100%;
  overflow: auto;
  padding: 1.5rem;
`;

const FooterNav = styled.div`
  position: relative;
`;

const ContentSwitcher = ({ value, setValue }) => {
  const { closeAlert } = useGlobalAlert();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    closeAlert();
  };

  return (
    <Tabs value={value} onChange={handleChange} variant="fullWidth">
      <Tab icon={<BallotIcon />} />
      <Tab icon={<ArticleIcon />} />
    </Tabs>
  );
};

function App() {
  const [screen, setScreen] = React.useState(Screen.Form);
  const showSubmissionScreen = screen === Screen.Submission;

  const onSubmit = () => {
    setScreen(Screen.Submission);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalAlertProvider>
        <Container className="App">
          <Content>
            <img src={logo} alt="logo" width="64" />
            <Formik onSubmit={onSubmit}>
              <FormScreen show={!showSubmissionScreen} />
              <SubmissionScreen show={showSubmissionScreen} />
            </Formik>
          </Content>
          <FooterNav>
            <GlobalAlert />
            <ContentSwitcher value={screen} setValue={setScreen} />
          </FooterNav>
        </Container>
      </GlobalAlertProvider>
    </ThemeProvider>
  );
}

export default App;
