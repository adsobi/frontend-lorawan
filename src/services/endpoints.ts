import axios from "axios";
import AuthHeader from "./auth-header";

export interface ObjectWithId {
  id: number;
}

//* END-NODES */
export const GetEndnodes = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "end-nodes", { headers: AuthHeader() });
};
export const GetEndNodeLogs = async (id: number|string|undefined) => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "end-nodes/" + id + "/data", { headers: AuthHeader() });
};
export const DeleteEndNode = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "end-nodes/" + id, { headers: AuthHeader() });
};
export const CreateEndNode = async (
  name: string,
  description: string,
  join_eui: string,
  dev_eui: string,
  count_to_response: number,
  app_id: string
  ) => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL + "end-nodes", {
      name,
      description,
      join_eui,
      dev_eui,
      count_to_response,
      app_id,
    }, { headers: AuthHeader() });
};
//* GATEWAYS */
export const GetGateways = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "gateways", { headers: AuthHeader() });
};
export const DeleteGateway = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "gateways/" + id, { headers: AuthHeader() });
};
export const CreateGateway = async (name: string, description: string, gateway_eui: string) => {
  return await axios.post(process.env.REACT_APP_BACKEND_URL + "gateways", {
    name,
    description,
    gateway_eui,
  }, { headers: AuthHeader() });
};

//* GATEWAYS */
export const GetApplications = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "apps", { headers: AuthHeader() });
};
export const DeleteApplication = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "apps/" + id, { headers: AuthHeader() });
};
export const CreateApplication = async (
  name: string,
  description: string,
  key: string,
  ) => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL + "apps", {
      name,
      description,
      key,
    }, { headers: AuthHeader() });
};
