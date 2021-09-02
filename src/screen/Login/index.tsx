import React from "react";
import LoginForm from "../../components/LoginForm";
import api from "../../api";
import {StyledContainer as LoginContainer} from "./styles";

type LoginState = "success" | "fail" | "idle" | "loading";

const Login = () => {
  const [loginState, setLoginState] = React.useState<LoginState>("idle");
  const [submitAttempts, setSubmitAttempt] = React.useState(0);

  const isDisabled = submitAttempts >= 3;

  const handleSubmit = async (payload: any) => {
    try {
      setLoginState("loading");
      await api.login(payload);
      setLoginState("success");
    } catch (error) {
      setLoginState("fail");
      setSubmitAttempt((prev) => prev + 1);
    }
  };

  const getLoginState = (state: LoginState) => {
    const message = {
      idle: "",
      loading: "loading",
      success: "login successful",
      fail: "incorrect username or password",
    };
    return message[state];
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit} reachedFailLimit={isDisabled} />
      <div>{getLoginState(loginState)}</div>
    </LoginContainer>
  );
};

export default Login;
