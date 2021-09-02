import React from "react";
import {FormButton, InputGroup, ButtonContainer} from "./styles";

interface IProps {
  onSubmit: Function;
  reachedFailLimit: boolean;
}

const LoginForm = (prop: IProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const shouldDisble = prop.reachedFailLimit || Boolean(!username || !password);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    prop.onSubmit({username, password});
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <label htmlFor="username-input">Enter username here</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password-input">Enter password here</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>
      <ButtonContainer>
        <FormButton disabled={shouldDisble}>submit</FormButton>
      </ButtonContainer>
    </form>
  );
};

export default LoginForm;
