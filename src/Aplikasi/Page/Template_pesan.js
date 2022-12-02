import { useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Popover } from "react-tiny-popover";
import Tambah_template from "./Template_pesan/Tambah_template";
import axios from "axios";
import baseUrl from "../GlobalVariabel";
import qs from "query-string";
import Edit_template from "./Template_pesan/Edit_template";
const Template_pesan = () => {
  document.title = "Template Pesan";
  const [tambah, setTambah] = useState(false);
  const [edit, setEdit] = useState("");
  const [data, setData] = useState([]);
  const [_aktif_menu] = useOutletContext();
  const [reload, setReload] = useState(0);
  const ref = useRef();
  useEffect(() => {
    _aktif_menu("template_pesan");
    load();
    setEdit("");
  }, [reload]);
  const load = () => {
    axios.post(baseUrl("template_pesan/get_template.php")).then((respon) => {
      setData(respon.data.data);
    });
  };
  const _hapus = (id) => {
    axios
      .post(
        baseUrl("template_pesan/hapus_template.php"),
        qs.stringify({
          id_template: id,
        })
      )
      .then((respon) => {
        if (respon.data.status == "template_terhapus") {
          alert("Template berhasil dihapus");
          setReload(reload + 1);
        }
      });
  };
  const _edit = (id) => {
    setEdit(id);
  };

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Template Pesan</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Template Pesan
            </li>
          </ol>
        </div>
        <div className="card">
          <div className="card-body">
            <Popover clickOutsideCapture={true} isOpen={tambah} content={<Tambah_template tambah={tambah} reload={reload} setReload={setReload} setTambah={setTambah} />} positions={["left"]}>
              <button
                onClick={() => {
                  setTambah(tambah == true ? false : true);
                }}
                className="btn float-right btn-primary"
              >
                Tambah Template
              </button>
            </Popover>

            <h4>Data Template</h4>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr style={{ background: "#F34900", color: "#FFF", fontWeight: "bold" }}>
                    <td>#</td>
                    <td>No</td>
                    <td>Nama Templat</td>
                    <td>Template</td>
                    <td>Tanggal Pembuatan</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((list, index) => (
                    <>
                      <tr>
                        <td>
                          {edit != list.id_template && (
                            <>
                              <button
                                onClick={() => {
                                  _edit(list.id_template);
                                }}
                                className="btn btn-success"
                              >
                                <i className="fa fa-edit" />
                              </button>{" "}
                              <button
                                onClick={() => {
                                  var c = window.confirm("Apakah anda ingin hapus data ini?");
                                  if (c) {
                                    _hapus(list.id_template);
                                  }
                                }}
                                className="btn btn-danger"
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </>
                          )}
                        </td>
                        <td>{index + 1}</td>
                        {edit == list.id_template ? (
                          <Edit_template reload={reload} setReload={setReload} id_template={list.id_template} template={list.template} nama_template={list.nama_template} ref={ref} />
                        ) : (
                          <>
                            <td>{list.nama_template}</td>
                            <td>{list.template}</td>
                          </>
                        )}

                        <td>
                          <div className="badge badge-primary">{list.tanggal}</div>
                        </td>
                      </tr>
                      {edit == list.id_template && (
                        <>
                          <tr style={{ background: "#9EFA8C" }}>
                            <td style={{ textAlign: "center" }} colSpan={5}>
                              <div>Silahakan tombol update untuk menyimpan perubahan</div>
                              <button
                                onClick={() => {
                                  ref.current.update_template();
                                }}
                                className="btn btn-primary"
                              >
                                Update Data
                              </button>
                              &nbsp;&nbsp;{" "}
                              <button
                                onClick={() => {
                                  setEdit("");
                                }}
                                className="btn btn-danger"
                              >
                                Batal
                              </button>
                            </td>
                          </tr>
                        </>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Modal Logout */}
      </div>
      {/*-Container Fluid*/}
    </>
  );
};

export default Template_pesan;
