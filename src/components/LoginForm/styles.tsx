import styled from "styled-components";

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  max-width: 100%;
`;

export const FormButton = styled.button`
  background: palevioletred;
  color: #fff;
  border: none;
  padding: 10px;
  &:disabled {
    background: #f4f4f4;
    color: palevioletred;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
