import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../../../GlobalVariabel";

const Step2 = (props) => {
  const [data, setData] = useState([]);
  const [kontak, setKontak] = useState([]);
  useEffect(() => {
    _load();
  }, []);
  const _load = () => {
    axios.post(baseUrl("broadcast_pesan/get_list_kontak.php")).then((respon) => {
      const ar_baru = [];
      respon.data.data.map((list, index) => {
        ar_baru.push({
          id_kontak: list.id_kontak,
          nama_kontak: list.nama_kontak,
          nomor_handphone: list.nomor_handphone,
          check: false,
        });
      });
      setKontak(ar_baru);
    });
  };
  const check_list = (id_kontak) => {
    const ar = kontak.map((list) => {
      if (list.id_kontak === id_kontak) {
        const cek = list.check === true ? false : true;
        return { ...list, check: cek };
      }
      return list;
    });
    setKontak(ar);
  };
  const pilih_semua = (value) => {
    const ar = kontak.map((list) => {
      return { ...list, check: value };
    });
    setKontak(ar);
  };
  const filter = kontak.filter((f_kontak) => {
    const cari = f_kontak.nama_kontak;
    return cari.match("gok/g");
  });
  const _simpan_kontak = () => {
    window.localStorage.setItem("akmalo_kontak", JSON.stringify(kontak));
    window.localStorage.setItem("akmalo_grup", "");
    alert("Kontak berhasil di simpan");
    props.next();
  };
  return (
    <>
      <div className="col-7" style={{ margin: "auto" }}>
        <div className="card">
          <div className="card-header">
            <button
              onClick={() => {
                _simpan_kontak();
              }}
              className="btn btn-danger float-right"
            >
              Simpan Kontak
            </button>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>Pilih Kontak</div>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>No</td>
                  <td>Nama</td>
                  <td>Nomor Handphone</td>
                  <td>
                    <label>
                      <span>[Pilih Semua]</span>
                      <input
                        onChange={(e) => {
                          pilih_semua(e.target.checked);
                        }}
                        type={"checkbox"}
                      />
                    </label>
                  </td>
                </tr>
              </thead>
              <tbody>
                {kontak.map((list, index) => (
                  <tr
                    key={index}
                    style={{
                      opacity: list.check == false ? "0.4" : "1",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {list.nama_kontak}
                      <div className={"label label" + list.check == true ? "-success" : "-danger"}>{list.check == true ? "check" : "no_check"}</div>
                    </td>
                    <td>{list.nomor_handphone}</td>
                    <td style={{ textAlignt: "right" }}>
                      <input
                        style={{ textAlign: "right", width: "20px" }}
                        onChange={() => {
                          check_list(list.id_kontak);
                        }}
                        checked={list.check}
                        defaultChecked={list.check}
                        type={"checkbox"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
