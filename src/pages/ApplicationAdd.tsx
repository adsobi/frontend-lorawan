import React, { useEffect, useState } from "react";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetApplicationContext, GetApplications } from "../services/endpoints";
import { ErrorMessage } from "formik";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ApplicationAdd: React.FC = () => {
  // const currentUser = getCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const appId = useParams();

  // useEffect(() => {
  //   GetApplicationContext(1).then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       setContent(_content);
  //     }
  //   );
  // }, []);

  const columns: Column[] = [
    { id: 'name', label: 'Nazwa', minWidth: 170 },
    { id: 'endDeviceNumber', label: 'Liczba urządzeń końcowych', align: 'center', minWidth: 100 },
    {
      id: 'createdAt',
      label: 'Utworzono',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('pl-PL'),
    },
  ];

  interface Data {
    id: number,
    name: string;
    endDeviceNumber: number;
    createdAt: string
  }

  function createData(
    id: number,
    name: string,
    endDeviceNumber: number,
    createdAt: string
  ): Data {
    return { id, name, endDeviceNumber, createdAt};
  }

  const rows = [
    createData(1,'test-app-for-lorawan', 2, '2022-06-21 15:21:23'),
  ];

  return (
    <div>
      <h4>Aplikacje</h4>
      {/* <StickyHeadTable rows={rows} columns={columns} path="/applications/"></StickyHeadTable> */}
    </div>
  );
};
export default ApplicationAdd;