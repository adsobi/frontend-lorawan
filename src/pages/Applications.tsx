import React, { useEffect, useState } from "react";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetApplications } from "../services/endpoints";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Applications: React.FC = () => {
  // const currentUser = getCurrentUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const appId = useParams();

  useEffect(() => {
    GetApplications().then(
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
        <h4 >Aplikacje </h4>
        <Button onClick={() => { navigate('add')} }>Dodaj aplikację</Button>
      </div>
      <StickyHeadTable rows={rows} columns={columns}></StickyHeadTable>
    </div>
  );
};
export default Applications;