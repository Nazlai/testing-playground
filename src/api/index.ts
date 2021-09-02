import axios from "axios";

const login = ({username, password}: {username: string; password: string}) => {
  return axios.put("/api/login", {username, password});
};

const api = {login};

export default api;
