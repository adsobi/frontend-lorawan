import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetEndNodeLogs } from "../services/endpoints";

const EndNodesLogs: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
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

        switch (params.id) {
          case '1': {
            setName('test-end-node');
            break;
          }
          case '2': {
            setName('test-end-node-2');
            break;
          }
        }
      }
    );
  }, []);

  const columns: Column[] = [
    { id: 'time', label: 'Czas', minWidth: 170 },
    { id: 'type', label: 'Typ zdarzenia', minWidth: 100 },
    { id: 'SNR', label: 'SNR', minWidth: 100 },
    { id: 'RSSI', label: 'RSSI', minWidth: 100 },
    { id: 'data', label: 'Dane', minWidth: 200, align: 'center' },
  ];

  interface Data {
    id: number,
    time: string,
    type: string,
    SNR:  string,
    RSSI: string,
    data: string
  }

  function createData(
    id: number,
    time: string,
    type: string,
    SNR:  string,
    RSSI: string,
    data: string
  ): Data {
    return { id, time, type, SNR, RSSI, data};
  }

  const rows = [
    createData(1,'2022-06-21 15:21:23', 'JoinRequest', '8.8','-30', ''),
    createData(2,'2022-06-21 15:21:24', 'JoinAccept', '9.0', '-29', ''),
    createData(3,'2022-06-21 15:21:25', 'Uplink', '8.1','-32','{"delay": 5000, "0": 23.4 }'),
    createData(4,'2022-06-21 15:21:30', 'Uplink', '7.7','-30','{"delay": 5000, "0": 23.2 }'),
    createData(5,'2022-06-21 15:21:35', 'Uplink', '10.1','-29','{"delay": 5000, "0": 23.3 }'),
  ];

  return (
    <div>
      <div className="my-4 d-flex justify-content-between">
        <h4>Komunikaty urządzenia {name}</h4>
      </div>
      <StickyHeadTable rows={rows} columns={columns}></StickyHeadTable>
    </div>
  );
};
export default EndNodesLogs;