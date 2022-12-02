import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../GlobalVariabel";
import qs from "query-string";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Detail_pesan = () => {
  const { id } = useParams();
  const navigasi = useNavigate();
  const [pesan, setPesan] = useState({});
  const [kontak, setKontak] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "nama_kontak", headerName: "Nama Kontak", width: 200 },
    { field: "nomor_handphone", headerName: "Nomor Handphone", width: 160 },
    { field: "cost", headerName: "Cost", width: 130 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "time", headerName: "Time", width: 170 },
  ];
  useEffect(() => {
    _load();
  }, []);
  const _load = () => {
    axios
      .post(
        baseUrl("broadcast_pesan/detail_pesan.php"),
        qs.stringify({
          id_pesan: id,
        })
      )
      .then((respon) => {
        setPesan(respon.data.pesan);
        const ar_data = [];
        respon.data.kontak.map((list, index) => {
          ar_data.push({
            id: list.id_pesan_kontak,
            nama_kontak: list.nama_kontak,
            nomor_handphone: list.nomor_handphone,
            cost: "Rp. " + list.cost,
            status: list.text,
            time: list.time,
          });
        });
        setKontak(ar_data);
      });
  };
  return (
    <>
      <div className="col-12" style={{ padding: "30px" }}>
        <button
          onClick={() => {
            navigasi(-1);
            //  console.log(data.pesan.pesan);
          }}
          className="btn btn-danger"
        >
          <i className="fa fa-chevron-left" />
          Kembali
        </button>
        <div className="card">
          <div className="card-header">
            <div style={{ fontWeight: "bold" }}>Detail Pesan</div>
          </div>
          <div className="card-body">
            <table className="table table-stripped">
              <tr>
                <td width="30%">Judul Pesan</td>
                <td width="10px">:</td>
                <td>{pesan.judul}</td>
              </tr>
              <tr>
                <td>Isi Pesan</td>
                <td>:</td>
                <td>{pesan.pesan}</td>
              </tr>
              <tr>
                <td>Tanggal Pesan</td>
                <td>:</td>
                <td>{pesan.tanggal}</td>
              </tr>
              <tr>
                <td>Platform Pengiriman Pesan</td>
                <td>:</td>
                <td>{pesan.type}</td>
              </tr>
            </table>
            <div>
              <div style={{ fontWeight: "bold" }}>Kontak Yang Di Kirim</div>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={kontak} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail_pesan;
