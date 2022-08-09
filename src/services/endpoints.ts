import axios from "axios";
import AuthHeader from "./auth-header";

export interface ObjectWithId {
  id: number;
}

//* END-NODES */
export const GetEndnodes = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "endnodes", { headers: AuthHeader() });
};
export const GetEndNodeContext = async (id: number) => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "endnodes/" + id, { headers: AuthHeader() });
};
export const GetEndNodeLogs = async (id: number|string|undefined) => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "endnodes/", { headers: AuthHeader() });
};
export const DeleteEndNode = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "endnodes/" + id, { headers: AuthHeader() });
};
export const CreateEndNode = async (
  name: string,
  description: string,
  joinEUI: string,
  devEUI: string,
  downlinkInvoke: number,
  applicationId: string
  ) => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL + "create", {
      name,
      description,
      joinEUI,
      devEUI,
      downlinkInvoke,
      applicationId,
    }
  );
};
//* GATEWAYS */
export const GetGateways = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "gateways", { headers: AuthHeader() });
};
export const DeleteGateway = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "gateways/" + id, { headers: AuthHeader() });
};
export const CreateGateway = async (name: string, description: string, gatewayEUI: string, applicationId: string) => {
  return await axios.post(process.env.REACT_APP_BACKEND_URL + "create", {
    name,
    description,
    gatewayEUI,
    applicationId,
  });
};

//* GATEWAYS */
export const GetApplications = async () => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + "applications", { headers: AuthHeader() });
};
export const DeleteApplication = async (id: number) => {
  return await axios.delete<ObjectWithId>(process.env.REACT_APP_BACKEND_URL + "applications/" + id, { headers: AuthHeader() });
};
export const CreateApplication = async (
  name: string,
  description: string,
  appKey: string,
  ) => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL + "create", {
      name,
      description,
      appKey,
    }
  );
};
