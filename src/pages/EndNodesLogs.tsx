import { compose } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StickyHeadTable, { Column } from "../components/StickyHeadTable";
import { GetEndNodeLogs } from "../services/endpoints";

const EndNodesLogs: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rows, setRows] = useState<[{[key:string]: any}]>([{}]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetEndNodeLogs(params.id).then(
      (response) => {
        setRows(response.data.data.map((obj: any) => { return createData(obj.id, obj.created_at, obj.type, obj.snr, obj.rssi, obj.data)}))
        setName(response.data.data[0].end_node.name);
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