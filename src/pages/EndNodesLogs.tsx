import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import Table from "../components/Table";
import { GetEndNodeLogs } from "../services/endpoints";
const EndNodesLogs: React.FC = () => {
  // const currentUser = getCurrentUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const appId = useParams();

  useEffect(() => {
    GetEndNodeLogs().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

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
      <div className="my-4 d-flex justify-content-between">
        <h4>Komunikaty urządzenia </h4>
      </div>
      <StickyHeadTable rows={rows} columns={columns}></StickyHeadTable>
    </div>
  );
};
export default EndNodesLogs;