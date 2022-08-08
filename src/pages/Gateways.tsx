import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteGateway, GetGateways, ObjectWithId } from "../services/endpoints";

const Gateways: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    GetGateways().then(
      (response) => {
        //setContent(response.data);
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
  }, [content]);

  const columns: Column[] = [
    { id: 'name', label: 'Nazwa', minWidth: 120 },
    { id: 'description', label: 'Opis', minWidth: 100 },
    { id: 'nameOfApplication', label: 'Nazwa aplikacji', minWidth: 170 },
    { id: 'gatewayEUI', label: 'Gateway EUI', minWidth: 100 },
    { id: 'lastActivity', label: 'Ostatnia aktywność', minWidth: 120 },
    { id: 'createdAt', label: 'Utworzono', minWidth: 120 },
    { id: 'deleteButton', label: 'Usuwanie', align: 'right', minWidth: 100 },
  ];

  interface Data {
    id: number,
    name: string,
    description: string,
    nameOfApplication: string,
    gatewayEUI: string,
    lastActivity: string,
    createdAt: string,
    deleteButton: JSX.Element
  }

  const DeleteButton = (id: number) => {
    return <Button onClick={ () => { DeleteGateway(id)} }>Usuń</Button>
  }

  function createData(
    id: number,
    name: string,
    description: string,
    nameOfApplication: string,
    gatewayEUI: string,
    lastActivity: string,
    createdAt: string,
    deleteButton: JSX.Element
  ): Data {
    return { id, name, description, nameOfApplication, gatewayEUI, lastActivity, createdAt, deleteButton };
  }

  const rows = [
    createData(1,'bramka-test', 'Testowa bramka sieciowa', 'test-app-for-lorawan', '1DEE159413076858', '2022-08-21 15:21:23', '2022-06-21 15:21:23', DeleteButton(1))
  ];

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