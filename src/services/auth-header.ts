import { AxiosRequestHeaders } from "axios";
import React from "react";
import useAuth from "../hooks/Auth";

const AuthHeader = () => {
    const token = localStorage.getItem('token');

    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return { Authorization: '' };
    }
  }

export default AuthHeader;