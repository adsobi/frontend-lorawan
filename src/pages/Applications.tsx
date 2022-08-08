import React, { useEffect, useState } from "react";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteApplication, GetApplications } from "../services/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Applications: React.FC = () => {

  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

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
    { id: 'description', label: 'Opis', minWidth: 170 },
    { id: 'appKey', label: 'Klucz aplikacji', align: 'center', minWidth: 100 },
    { id: 'endDeviceAmount', label: 'Liczba urządzeń końcowych', align: 'center', minWidth: 170 },
    { id: 'createdAt', label: 'Utworzono', minWidth: 170 },
    { id: 'deleteButton', label: 'Usuwanie', align: 'right', minWidth: 100 },
  ];

  interface Data {
    id: number,
    name: string;
    description: string,
    appKey: string,
    endDeviceAmount: number;
    createdAt: string,
    deleteButton: JSX.Element
  }

  const DeleteButton = (id: number) => {
    return <Button onClick={ () => { DeleteApplication(id)} }>Usuń</Button>
  }

  function createData(
    id: number,
    name: string,
    description: string,
    appKey: string,
    endDeviceAmount: number,
    createdAt: string,
    deleteButton: JSX.Element
  ): Data {
    return { id, name, description, endDeviceAmount, appKey, createdAt, deleteButton};
  }

  const rows = [
    createData(1,'test-app-for-lorawan', 'Aplikacja testowa', '7CB49F63AC807CED46D681D539B40F09', 2, '2022-06-21 15:21:23', DeleteButton(1)),
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