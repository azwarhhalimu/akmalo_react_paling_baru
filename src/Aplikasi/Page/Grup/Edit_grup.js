import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../GlobalVariabel";
const Edit_grup = ({ id_grup, nama_grup, trigger, load }) => {
  const update = (e) => {
    e.preventDefault();
    axios.post(baseUrl("grup/update_grup.php"), qs.stringify({ id_grup: id_grup, nama_grup: namaGrup })).then((respon) => {
      if (respon.data.status == "grup_terupdate") {
        window.alert("Data berhasil di update");
        load();
        trigger();
      }
    });
  };
  const [namaGrup, setNamaGrup] = useState(nama_grup);
  return (
    <>
      <div>
        <form onSubmit={update}>
          <div>
            <input
              onChange={(e) => {
                setNamaGrup(e.target.value);
              }}
              required
              autoFocus
              value={namaGrup}
              className="form-control"
              type={"text"}
              placeholder={"Nama Grup"}
            />
          </div>
          <div style={{ height: "10", width: "100%" }}></div>
          <div>
            <button type="submit" style={{ marginTop: "10px" }} className="btn btn-sm btn-success">
              Update
            </button>{" "}
            <button
              type="button"
              onClick={() => {
                trigger();
              }}
              style={{ marginTop: "10px" }}
              className="btn btn-sm btn-danger"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit_grup;
