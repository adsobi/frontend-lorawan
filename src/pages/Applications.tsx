import React, { useEffect, useState } from "react";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteApplication, GetApplications } from "../services/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Applications: React.FC = () => {

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rows, setRows] = useState<[{[key:string]: any}]>([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    GetApplications().then(
      (response) => {
        setRows(response.data.data.map((obj: any) => { return createData(obj.id, obj.name, obj.description, obj.key, obj.end_node_count, obj.created_at, DeleteButton(obj.id))}))
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(message);
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
    return <Button onClick={ () => { DeleteApplication(id).then(() => window.location.reload()) }}>Usuń</Button>
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