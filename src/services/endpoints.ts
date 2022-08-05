import axios from "axios";
import AuthHeader from "./auth-header";

const GetPublicContent = () => {
  return axios.get(process.env.REACT_APP_BACKEND_URL + "all");
};
const GetEndnodes = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "endnodes", { headers: AuthHeader() });
};
const GetEndNodeLogs = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "endnodes", { headers: AuthHeader() });
};
const GetGateways = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "gateways", { headers: AuthHeader() });
};
const GetApplications = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "applications", { headers: AuthHeader() });
};
const GetApplicationContext = async (id: number) => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "application/" + id, { headers: AuthHeader() });
};
const AddNode = async (username: string, email: string, password: string) => {
  return await axios.post(process.env.REACT_APP_BACKEND_URL + "add-node", {
    username,
    email,
    password,
  });
};

export { GetPublicContent, GetEndnodes, GetEndNodeLogs, GetGateways, GetApplications, GetApplicationContext, AddNode}