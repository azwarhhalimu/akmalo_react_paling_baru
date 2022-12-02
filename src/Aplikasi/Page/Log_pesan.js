import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../GlobalVariabel";
const Log_pesan = () => {
  document.title = "Log Pesan";
  const [log, setLog] = useState([]);
  const [_aktif_menu] = useOutletContext();

  const columns = [
    { field: "no", headerName: "#", width: 40 },
    { field: "id", headerName: "ID", width: 140 },
    { field: "nama_kontak", headerName: "Nama Kontak", width: 230 },
    { field: "no_handphone", headerName: "Nomor Handphone", width: 140 },
    { field: "status", headerName: "Status Pesan", width: 120 },
    { field: "cost", headerName: "Biaya", width: 80 },
    { field: "ex_time", headerName: "Execution Time", width: 170 },
  ];

  useEffect(() => {
    _aktif_menu("log_pesan");
    _load();
  }, []);
  const _load = () => {
    const newArray = [];
    axios.post(baseUrl("broadcast_pesan/get_log_pesan.php")).then((respon) => {
      respon.data.data.map((list, index) => {
        newArray.push({
          no: index + 1,
          id: list.id_pesan_kontak,
          nama_kontak: list.nama_kontak,
          no_handphone: list.nomor_handphone,
          status: list.text,
          cost: list.cost,
          ex_time: list.time,
        });
      });
      setLog(newArray);
      console.log(newArray);
    });
  };
  return (
    <>
      <>
        <div className="container-fluid" id="container-wrapper">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Log Pesan</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="./">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Log Pesan
              </li>
            </ol>
          </div>
          <div className="card">
            <div className="card-header">
              <b>Data Log Pesan</b>
            </div>
            <div className="card-body">
              <div style={{ height: 400, width: "100%" }}>{<DataGrid rows={log} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />}</div>
            </div>
          </div>
          {/* Modal Logout */}
        </div>
        {/*-Container Fluid*/}
      </>
    </>
  );
};

export default Log_pesan;
