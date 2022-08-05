import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetEndnodes } from "../services/endpoints";

const EndNodes: React.FC = () => {

  type TEndnodes = {
    name: string
    devEUI: string
    joinEUI: string
    lastActivity: Date
  }

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
    { id: 'devEUI', label: 'DevEUI', minWidth: 100 },
    { id: 'joinEUI', label: 'JoinEUI', minWidth: 100 },
    {
      id: 'lastActivity',
      label: 'Utworzono',
      minWidth: 170,
      align: 'right',
    },
  ];

  interface Data {
    id: number,
    name: string,
    devEUI: string,
    joinEUI: string,
    lastActivity: string
  }

  function createData(
    id: number,
    name: string,
    devEUI: string,
    joinEUI: string,
    lastActivity: string
  ): Data {
    return { id, name, devEUI, joinEUI, lastActivity };
  }

  const rows = [
    createData(1, 'test-end-node', 'E66118C4E326972C', '0000000000000000', '2022-08-02 15:21:23'),
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