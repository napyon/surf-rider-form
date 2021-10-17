import React from "react";

export const GlobalAlertContext = React.createContext({});

export const GlobalAlertProvider = ({ children }) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const closeAlert = () => setShowAlert(false);

  const triggerAlert = (props) => {
    if (!showAlert) {
      setAlertProps(props);
      setShowAlert(true);
    }
  };

  return (
    <GlobalAlertContext.Provider
      value={{ showAlert, closeAlert, alertProps, triggerAlert }}
    >
      {children}
    </GlobalAlertContext.Provider>
  );
};

export const useGlobalAlert = () => {
  const alertContext = React.useContext(GlobalAlertContext);
  return alertContext;
};
