import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteEndNode, GetEndnodes } from "../services/endpoints";

const EndNodes: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rows, setRows] = useState<[{[key:string]: any}]>([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    GetEndnodes().then(
      (response) => {
        setRows(response.data.data.map((obj: any) => { return createData(obj.id, obj.name, obj.description, obj.app.name, obj.dev_eui, obj.join_eui, obj.count_to_response, obj.last_activity, DeleteButton(obj.id))}))
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
    { id: 'nameOfApplication', label: 'Nazwa aplikacji', minWidth: 170 },
    { id: 'devEUI', label: 'DevEUI', minWidth: 100 },
    { id: 'joinEUI', label: 'JoinEUI', minWidth: 100 },
    { id: 'downlinkInvoke', label: 'Liczba pakietów do odpowiedzi serwera', minWidth: 170, align: 'center' },
    { id: 'lastActivity', label: 'Ostatnia aktywność', minWidth: 120 },
    { id: 'deleteButton', label: 'Usuwanie', align: 'right', minWidth: 100 },
  ];

  interface Data {
    id: number,
    name: string,
    description: string,
    nameOfApplication: string,
    devEUI: string,
    joinEUI: string,
    downlinkInvoke: number
    lastActivity: string,
    deleteButton: JSX.Element
  }

  const DeleteButton = (id: number) => {
    return <Button onClick={(e) => { DeleteEndNode(id).then(() => navigate('/endnodes')) }}>Usuń</Button>
  }

  function createData(
    id: number,
    name: string,
    description: string,
    nameOfApplication: string,
    devEUI: string,
    joinEUI: string,
    downlinkInvoke: number,
    lastActivity: string,
    deleteButton: JSX.Element
  ): Data {
    return {
      id, name, description, nameOfApplication, devEUI,
      joinEUI, downlinkInvoke, lastActivity, deleteButton
    };
  }

  return (
    <div>
      <div className="my-4 d-flex justify-content-between">
        <h4>Urządzenia końcowe</h4>
        <Button onClick={() => { navigate('add') }}>Dodaj urządzenie końcowe</Button>
      </div>
      <StickyHeadTable rows={rows} columns={columns} path="/endnodes/"></StickyHeadTable>
    </div>
  );
};

export default EndNodes