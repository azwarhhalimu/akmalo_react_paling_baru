import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import Pilih_kontak from "./Broadcast_pesan/Pilih_kontak";
import axios from "axios";
import baseUrl from "../GlobalVariabel";
const Pesan = () => {
  document.title = "Pesan";
  const navigasi = useNavigate();
  const [data, setData] = useState([]);
  const [_aktif_menu] = useOutletContext();
  useEffect(() => {
    _aktif_menu("pesan");
    _load();
  }, []);
  const _load = () => {
    axios.post(baseUrl("broadcast_pesan/get_pesan.php")).then((respon) => {
      setData(respon.data.data);
    });
  };

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">BroadCast Pesan</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Broadcast Pesan
            </li>
          </ol>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="float-right">
              <Link to={"/pesan/buat_pesan_semua_kontak"} className="btn btn-outline-light mb-1">
                Pesan Ke Semua Kontak
              </Link>
              <button
                onClick={() => {
                  navigasi("/pesan/buat_pesan/grup");
                }}
                className="btn btn-outline-light mb-1"
              >
                Pesan Grup
              </button>{" "}
              <button className="btn btn-outline-light mb-1">
                <i className="fa fa-report" />
                Report
              </button>
            </div>
            <div>Data Pesan</div>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>No</td>
                  <td>Judul Pesan</td>
                  <td>Isi Pesan</td>
                  <td>Waktu Pengiriman</td>
                  <td>Platform Pengiriman</td>

                  <td>Ops</td>
                </tr>
              </thead>
              <tbody>
                {data.map((list, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {list.judul}
                      <div>
                        {list.grup != "" && (
                          <>
                            <div className="badge badge-danger">{list.grup}</div>
                          </>
                        )}
                      </div>
                    </td>
                    <td>{list.pesan}</td>
                    <td>{list.tanggal_pesan}</td>
                    <td>{list.type}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigasi("/" + list.id_pesan + "/pesan/detail_pesan");
                        }}
                        className="btn btn-danger"
                      >
                        Lihat Data <i className="fa fa-chevron-right" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length == 0 && (
              <center>
                <img src="/no_data.webp" style={{ width: "200px" }} />
                <div style={{ fontWeight: "bold", fontSize: "30px" }}>Oppss</div>
                <div>Data pesan masih kosong</div>
              </center>
            )}
          </div>
        </div>
        {/* Modal Logout */}
      </div>
      {/*-Container Fluid*/}
    </>
  );
};

export default Pesan;
