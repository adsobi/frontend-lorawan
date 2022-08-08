import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetEndNodeLogs } from "../services/endpoints";

const EndNodesLogs: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    GetEndNodeLogs(params.id).then(
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
    { id: 'time', label: 'Czas', minWidth: 170 },
    { id: 'type', label: 'Typ zdarzenia', minWidth: 100 },
    { id: 'data', label: 'Dane', minWidth: 200, align: 'center' },
  ];

  interface Data {
    id: number,
    time: string,
    type: string,
    data: string
  }

  function createData(
    id: number,
    time: string,
    type: string,
    data: string
  ): Data {
    return { id, time, type, data};
  }

  const rows = [
    createData(1,'2022-06-21 15:21:23', 'JoinRequest', ''),
    createData(2,'2022-06-21 15:21:24', 'JoinAccept', ''),
    createData(3,'2022-06-21 15:21:25', 'Uplink', '{"delay": 5000, "0": 23.4 }'),
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