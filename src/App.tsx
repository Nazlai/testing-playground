import React from "react";
import Login from "./screen/Login";
import {GlobalStyle} from "./globalStyles";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Login />
    </React.Fragment>
  );
};

export default App;
