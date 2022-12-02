import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../GlobalVariabel";
import qs from "query-string";
import Edit_grup from "./Grup/Edit_grup";

const Group = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState("");
  const [reload, setReload] = useState(0);

  const [nama_grup, setNamaGrup] = useState();
  document.title = "Grup Kontak";

  const _cencel_edit = () => {
    setEdit("");
    // alert();
  };
  const load = () => {
    axios.post(baseUrl("grup/get_all_grup.php")).then((respon) => {
      setData(respon.data.data);
    });
  };
  const [_aktif_menu] = useOutletContext();
  useEffect(() => {
    _aktif_menu("grup-kontak");
    load();
  }, [reload]);

  const _hapus = (id_grup) => {
    const c = window.confirm("Apakah anda ingin hapus data ini?");
    if (c) {
      axios
        .post(
          baseUrl("grup/hapus_grup.php"),
          qs.stringify({
            id_grup: id_grup,
          })
        )
        .then((res) => {
          if (res.data.status == "grup_terhapus") {
            alert("Data berhasil di hapus");
            setReload(reload + 1);
          }
        });
    }
  };
  const _submit = (e) => {
    e.preventDefault();
    axios
      .post(
        baseUrl("grup/simpan_grup.php"),
        qs.stringify({
          nama_grup: nama_grup,
        })
      )
      .then((respon) => {
        if (respon.data.status == "grup_tersimpan") {
          alert("Data berhasil tersimpan");
          setReload(reload + 1);
          e.target.reset();
        }
      });
  };

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">GRUP</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Home</a>
            </li>
            <li className="breadcrumb-item">Pages</li>
            <li className="breadcrumb-item active" aria-current="page">
              Blank Page
            </li>
          </ol>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <div style={{ fontWeight: "bold" }}>Tambah Grup</div>
              </div>
              <div className="card-body">
                <form onSubmit={_submit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nama GRup</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="exampleInputEmail1"
                      onChange={(e) => {
                        setNamaGrup(e.target.value);
                      }}
                      aria-describedby="emailHelp"
                      placeholder="Misal:Dosen"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Masukkan nama grup, Gunakan huruf kapital untuk awalan
                    </small>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card-header">
                <div style={{ fontWeight: "bold" }}>Data Grup Kontak</div>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr style={{ fontWeight: "bold" }}>
                      <td>No</td>
                      <td>Kode Grup</td>
                      <td>Nama Grup</td>
                      <td style={{ textAlign: "right" }}></td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((list, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{list.id_grup}</td>
                        <td>{edit == list.id_grup ? <Edit_grup trigger={_cencel_edit} load={load} id_grup={list.id_grup} nama_grup={list.nama_grup} /> : list.nama_grup}</td>

                        <td style={{ textAlign: "right" }}>
                          <button
                            onClick={() => {
                              setEdit(list.id_grup);
                            }}
                            className="btn btn-warning"
                          >
                            Edit
                          </button>{" "}
                          <button
                            onClick={() => {
                              _hapus(list.id_grup);
                            }}
                            className="btn btn-danger"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Logout */}
      </div>
      {/*-Container Fluid*/}
    </>
  );
};

export default Group;
