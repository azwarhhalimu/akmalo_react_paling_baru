import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../GlobalVariabel";
import qs from "query-string";

const Step2_gurp = (props) => {
  const [grup, setGrup] = useState([]);
  const [kontak, setKontak] = useState([]);
  useEffect(() => {
    _getGrup();
  }, []);
  const _getGrup = () => {
    axios.post(baseUrl("grup/get_all_grup.php")).then((respon) => {
      setGrup(respon.data.data);
    });
  };
  const _getKontak = (data) => {
    setSgrup(data);
    axios
      .post(
        baseUrl("broadcast_pesan/get_kontak_grup.php"),
        qs.stringify({
          id_grup: data,
        })
      )
      .then((respon) => {
        const _arData = [];
        respon.data.data.map((list, index) => {
          _arData.push({
            id_kontak: list.id_kontak,
            nama_kontak: list.nama_kontak,
            nomor_handphone: list.no_handphone,
            check: true,
          });
        });
        setKontak(_arData);
      });
  };
  const pilih_kontak = (id) => {
    const data = kontak.map((list) => {
      if (list.id_kontak == id) {
        const check = list.check == true ? false : true;
        return { ...list, check: check };
      } else {
        return list;
      }
    });
    setKontak(data);
  };

  const [semuaCheck, setSemuaCheck] = useState(true);
  const [sGrup, setSgrup] = useState();
  const check_semua = (value) => {
    setSemuaCheck(value);
    const ar_baruku = kontak.map((list) => {
      return { ...list, check: value };
    });
    setKontak(ar_baruku);
  };
  const _simpan_kontak = () => {
    window.localStorage.setItem("akmalo_kontak", JSON.stringify(kontak));
    alert("Kontak berhasil di simpan");
    window.localStorage.setItem("akmalo_grup", sGrup);
    props.next();
  };
  return (
    <>
      <div className="col-lg-7" style={{ margin: "auto" }}>
        <div className="card">
          <div className="card-header">
            <div style={{ fontWeight: "bold" }}>Pilih Grup</div>
          </div>
          <div className="card-body">
            <table width="100%">
              <tr>
                <td>Pilih Grup Kontak</td>
                <td>
                  <select
                    onChange={(e) => {
                      _getKontak(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Plih Grup</option>
                    {grup.map((list, index) => (
                      <option key={index} value={list.id_grup}>
                        {list.nama_grup}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </table>
            <div>
              <br />
              <table className="table">
                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <td>No</td>
                    <td>Nama Kontak</td>
                    <td>Nomor Handphone</td>
                    <td style={{ textAlign: "right" }}>
                      <label>
                        <span>Pilih semua</span>{" "}
                        <input
                          onChange={(e) => {
                            check_semua(e.target.checked);
                          }}
                          checked={semuaCheck}
                          type="checkbox"
                        />
                      </label>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {kontak.map((list, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {list.nama_kontak}
                        <div>{list.check == true ? "cehk" : "no"}</div>
                      </td>
                      <td>{list.nomor_handphone}</td>
                      <td style={{ textAlign: "right" }}>
                        <input
                          onChange={() => {
                            pilih_kontak(list.id_kontak);
                          }}
                          checked={list.check}
                          defaultChecked={list.check}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => {
                _simpan_kontak();
              }}
              className="btn btn-primary"
            >
              Simpan Kontak
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2_gurp;
