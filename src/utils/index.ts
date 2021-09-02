import faker from "faker";

export const generateUser = ({
  username,
  password,
}: {
  username?: string;
  password?: string;
} = {}) => {
  const genUsername = username ? username : faker.internet.userName();
  const genPassword = password ? password : faker.internet.password();
  return [genUsername, genPassword];
};
