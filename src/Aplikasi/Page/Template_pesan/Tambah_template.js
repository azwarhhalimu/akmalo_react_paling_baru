import axios from "axios";
import { useState } from "react";
import baseUrl from "../../GlobalVariabel";
import qs from "query-string";
const Tambah_template = (props) => {
  const [namaTemplate, setNamaTemplate] = useState("");
  const [isiTemplate, setIsiTemplate] = useState("");

  const _submit = (e) => {
    e.preventDefault();
    axios
      .post(
        baseUrl("template_pesan/simpan_template.php"),
        qs.stringify({
          nama_template: namaTemplate,
          template: isiTemplate,
        })
      )
      .then((respon) => {
        if (respon.data.status == "template_tersimpan") {
          window.alert("Template berhasil di simpan");
          props.setTambah(false);
          props.setReload(props.reload + 1);
        }
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: "bold" }}>Tambah Template</div>
        </div>
        <div className="card-body">
          <form onSubmit={_submit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Nama template</label>
              <input
                autoFocus
                type="text"
                onChange={(e) => {
                  setNamaTemplate(e.target.value);
                }}
                required
                className="form-control"
                placeholder="Misal Template jadwal"
              />
              <small id="emailHelp" className="form-text text-muted">
                Masukkan nama template yang ingin di buat
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Isi Template</label>
              <textarea
                onChange={(e) => {
                  setIsiTemplate(e.target.value);
                }}
                required
                className="form-control"
                placeholder="Misal: Disampaikan kepada seluruh mahasiswa..."
              ></textarea>
            </div>
            <hr />
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                props.setTambah("");
              }}
              className="btn btn-danger"
            >
              Tutup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tambah_template;
