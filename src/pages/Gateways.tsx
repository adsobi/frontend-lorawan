import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteGateway, GetGateways } from "../services/endpoints";

const Gateways: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rows, setRows] = useState<[{[key:string]: any}]>([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    GetGateways().then(
      (response) => {
        setRows(response.data.data.map((obj: any) => { return createData(obj.id, obj.name, obj.description, obj.gateway_eui, obj.last_activity, obj.created_at, DeleteButton(obj.id))}))
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
    { id: 'name', label: 'Nazwa', minWidth: 120 },
    { id: 'description', label: 'Opis', minWidth: 100 },
    { id: 'gatewayEUI', label: 'Gateway EUI', minWidth: 100 },
    { id: 'lastActivity', label: 'Ostatnia aktywność', minWidth: 120 },
    { id: 'createdAt', label: 'Utworzono', minWidth: 120 },
    { id: 'deleteButton', label: 'Usuwanie', align: 'right', minWidth: 100 },
  ];

  interface Data {
    id: number,
    name: string,
    description: string,
    gatewayEUI: string,
    lastActivity: string,
    createdAt: string,
    deleteButton: JSX.Element
  }

  const DeleteButton = (id: number) => {
    return <Button onClick={ () => { DeleteGateway(id).then(() => navigate('gateways')) }}>Usuń</Button>
  }

  function createData(
    id: number,
    name: string,
    description: string,
    gatewayEUI: string,
    lastActivity: string,
    createdAt: string,
    deleteButton: JSX.Element
  ): Data {
    return { id, name, description, gatewayEUI, lastActivity, createdAt, deleteButton };
  }

  return (
    <div>
      <div className="my-4 d-flex justify-content-between">
        <h4>Bramki sieciowe</h4>
        <Button onClick={() => { navigate('add')} }>Dodaj bramkę</Button>
      </div>
      <StickyHeadTable rows={rows} columns={columns}></StickyHeadTable>
    </div>
  );
};
export default Gateways;