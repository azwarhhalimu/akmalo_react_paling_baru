import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import baseUrl from "../GlobalVariabel";
import Edit_kontak from "./Kontak/Edit_kontak";
import qs from "query-string";
import No_data from "./Kontak/No_data";
const Kontak = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");
  const [_aktif_menu] = useOutletContext();
  const [reload, setReload] = useState(0);

  const reft = useRef();
  document.title = "Kontak";
  useEffect(() => {
    _aktif_menu("kontak");
    _getData();
    setEdit("");
  }, [reload]);
  const _getData = () => {
    axios.post(baseUrl("kontak/get_kontak.php")).then((respon) => {
      setData(respon.data.data);
    });
  };
  const _edit = (id) => {
    setEdit(id);
  };
  const _update = (nama, alamat, no_handphone) => {
    window.alert("alert");
  };
  const _hapus_kontak = (id) => {
    axios
      .post(
        baseUrl("kontak/hapus_kontak.php"),
        qs.stringify({
          id_kontak: id,
        })
      )
      .then((respon) => {
        if (respon.data.status == "kontak_terhapus") {
          alert("Data berhasil terhapus");
          setReload(reload + 1);
        }
      });
  };
  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Kontak</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            {/* <li className="breadcrumb-item">Pages</li> */}
            <li className="breadcrumb-item active" aria-current="Data Kontak">
              Data Kontak
            </li>
          </ol>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="float-right">
              <Link to={"/kontak/tambah-kontak"} className="btn  btn-primary">
                <i className=" fa fa-plus" />
                Tambah Data
              </Link>
            </div>
            <h3>Data Kontak</h3>

            <table className="table table-bordered">
              <thead>
                <tr
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  <td width={"120px"}></td>
                  <td>No</td>

                  <td>Nama</td>
                  <td>Alamat</td>
                  <td>Nomor Handphone</td>

                  <td>Grup</td>
                </tr>
              </thead>
              <tbody>
                {data.map((list, index) => (
                  <>
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            var c = window.confirm("Apakah anda ingin menghapus kontak ini?");
                            if (c) {
                              _hapus_kontak(list.id_kontak);
                            }
                          }}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="fa fa-trash" />
                        </button>{" "}
                        <button
                          onClick={() => {
                            _edit(list.id_kontak);
                          }}
                          className="btn btn-sm btn-primary"
                        >
                          <i style={{ fontSize: "12px" }} className="fa fa-edit" />
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      {edit == list.id_kontak ? (
                        <Edit_kontak ref={reft} reload={reload} setReload={setReload} _nama={list.nama} _alamat={list.alamat} _no_handphone={list.no_handphone} id_kontak={list.id_kontak} trigger={_update} /> // memanggil form edit
                      ) : (
                        <>
                          <td>{list.nama}</td>
                          <td>{list.alamat}</td>

                          <td>{list.no_handphone}</td>
                        </>
                      )}
                      <td>
                        {list.tags_kontak.map((tg_kontak, index) => (
                          <>
                            <div className="badge badge-danger">{tg_kontak.grup}</div>{" "}
                          </>
                        ))}
                      </td>
                    </tr>

                    {/* trigger untuk melakukan update */}
                    {edit == list.id_kontak && (
                      <tr
                        style={{
                          background: "#FFD6A0",
                        }}
                      >
                        <td colSpan={6} style={{ textAlign: "center" }}>
                          <div style={{ fontWeight: "bold" }}>Silahkan gunakan tombol di bawah ini untuk menyimpan perubahan</div>
                          <div>
                            <button
                              onClick={() => {
                                reft.current._submit();
                              }}
                              className="btn btn-success"
                            >
                              <i className="fa fa-check" /> Update
                            </button>{" "}
                            <button
                              onClick={() => {
                                setEdit("");
                              }}
                              className="btn btn-danger"
                            >
                              <i className="fa fa-close" />
                              Batal
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {data.length == 0 && <No_data />}
          </div>
        </div>
        {/* Modal Logout */}
      </div>
      {/*-Container Fluid*/}
    </>
  );
};

export default Kontak;
