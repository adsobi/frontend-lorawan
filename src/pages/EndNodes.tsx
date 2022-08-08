import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { DeleteEndNode, GetEndnodes } from "../services/endpoints";

const EndNodes: React.FC = () => {

  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    GetEndnodes().then(
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
    return <Button onClick={() => { DeleteEndNode(id) }}>Usuń</Button>
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

  const rows = [
    createData(1, 'test-end-node', 'Testowe urządzenie końcowe 1', 'test-app-for-lorawan',
      'E66118C4E326972C', '0000000000000000', 10, '2022-08-02 15:21:23', DeleteButton(1)),
    createData(2, 'test-end-node-2', 'Testowe urządzenie końcowe 2', 'test-app-for-lorawan',
      'E66118C4E32B5C29', '0000000000000000', 10, '2022-08-01 11:47:12', DeleteButton(2)),
  ];

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