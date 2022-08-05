import axios from "axios";
import useAuth from "../hooks/Auth";

const login = (username: string, password: string) => {
  return axios
    .post(process.env.REACT_APP_BACKEND_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      return response.data.accessToken
    }, (reject) => {
      return 'xdddd';
    });
};

export default login;