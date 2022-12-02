import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import baseUrl from "../../GlobalVariabel";
import qs from "query-string";
import "./style.css";
import No_data from "./No_data";
const Tambah_kontak = () => {
  const [grup, setGrup] = useState([]);
  const [pilihGrup, setPilihGrup] = useState([]);
  const [reload, setReload] = useState(0);

  const navigasi = useNavigate();
  const [_aktif_menu] = useOutletContext();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noInduk, setNoInduk] = useState("");
  const [no_handphone, setNo_handphone] = useState("");

  document.title = "Tambah Kontak";

  useEffect(() => {
    _aktif_menu("kontak");
    _init();
  }, [reload]);
  useEffect(() => {
    _getPilih_grup();
  }, [reload]);

  useEffect(() => {
    // menghapus grup yang di pilih
    axios.post(baseUrl("kontak/reset_grup.php")).then((respon) => {});
  }, []);
  const _init = () => {
    axios.post(baseUrl("kontak/get_grup.php")).then((respon) => {
      setGrup(respon.data.data);
    });
  };

  const _getPilih_grup = () => {
    axios.post(baseUrl("kontak/get_pilih_grup.php")).then((respon) => {
      setPilihGrup(respon.data.data);
    });
  };
  const pilih_grup = (id_grup) => {
    axios
      .post(
        baseUrl("kontak/pilih_grup.php"),
        qs.stringify({
          id_grup: id_grup,
        })
      )
      .then((respon) => {
        if (respon.data.status == "oke") {
          window.alert("Grup berhasil ditambahkan");
          setReload(reload + 1);
        }
      });
  };

  const hapus_grup = (id) => {
    axios
      .post(
        baseUrl("kontak/hapus_pilih_grup.php"),
        qs.stringify({
          id_pilih_grup: id,
        })
      )
      .then((respon) => {
        if (respon.data.status == "data_terhapus") {
          window.alert("Data berhasil di hapus");
          setReload(reload + 1);
        }
      });
  };
  const _submit = (e) => {
    e.preventDefault();
    if (pilih_grup.length == 0) {
      window.alert("Grup belum di pilih");
    } else {
      const c = window.confirm("Apakah anda ingin menyimpan kontak ini?");
      if (c) {
        axios
          .post(
            baseUrl("kontak/simpan_kontak.php"),
            qs.stringify({
              nama: nama,
              alamat: alamat,
              no_induk: noInduk,
              no_handphone: no_handphone,
            })
          )
          .then((respon) => {
            if (respon.data.status == "kontak_tersimpan") {
              alert("Data kontak berhasil di simpan");
              navigasi("/kontak");
            }
          });
      }
    }
  };

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <Link to="/kontak" className="btn btn-danger">
            <i className="fa fa-chevron-left" /> Kembali
          </Link>
          <h1 className="h3 mb-0 text-gray-800" style={{ paddingLeft: "150px" }}>
            Tambah Kontak
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={"/kontak"}>Kontak</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tambah Kontak
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <form onSubmit={_submit}>
                  <div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
                      <input
                        onChange={(e) => {
                          setNama(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Misal Akmalo"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Masukkan nama lengkap
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nomor Induk</label>
                      <input
                        onChange={(e) => {
                          setNoInduk(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Misal : +628"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Masukkan nomor induk
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1"> Alamat Lengkap</label>
                      <textarea
                        onChange={(e) => {
                          setAlamat(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Misal : Jl. Pahlawan"
                      ></textarea>
                      <small id="emailHelp" className="form-text text-muted">
                        Alamat saat ini mahasiswa tinggal
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nomor Handphone</label>
                      <input
                        onChange={(e) => {
                          setNo_handphone(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Misal : 082349189692"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Pastikan Nomor handphone yang di masukkan adalah nomor WhatsApp
                      </small>
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold" }}>Tags Grup </div>
                      {pilihGrup.map((list, index) => (
                        <>
                          <div class="badge badge-success">
                            {list.nama_grup}{" "}
                            <i
                              onClick={() => {
                                hapus_grup(list.id_pilih_grup);
                              }}
                              style={{ fontSize: "10px", color: "#FFF", marginLeft: "5px" }}
                              class="close fas fa-times"
                            ></i>
                          </div>{" "}
                        </>
                      ))}
                      {pilihGrup.length == 0 ? <No_data /> : ""}
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                      Simpan Data
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card">
              <div className="card-header">
                <div style={{ fontWeight: "bold" }}>Pilih Grup</div>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>No</td>
                      <td>Nama Grup</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {grup.map((list, index) => (
                      <tr>
                        <td>
                          <button
                            onClick={() => {
                              pilih_grup(list.id_grup);
                            }}
                            className="btn btn-primary"
                          >
                            <i className="fa fa-plus" />
                          </button>
                        </td>
                        <td>{index + 1}</td>
                        <td>{list.nama_grup}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        {/* Modal Logout */}
      </div>
      {/*-Container Fluid*/}
      <br />
      <br />
      <br />
    </>
  );
};

export default Tambah_kontak;
