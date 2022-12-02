import { DataGrid } from "@mui/x-data-grid";
import randomString from "random-string";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Step3 = () => {
  const [kode, setKode] = useState();
  const [angka1, setAngka1] = useState(
    randomString({
      length: 1,
      numeric: true,
      letters: false,
      special: false,
      // exclude: ["a", "b", "1"],
    })
  );
  const [angka2, setAngka2] = useState(
    randomString({
      length: 1,
      numeric: true,
      letters: false,
      special: false,
      // exclude: ["a", "b", "1"],
    })
  );
  const [hasil, setHasil] = useState(Number(angka1) + Number(angka2));
  const [kontak, setKontak] = useState([]);
  const columns = [
    { field: "nomor", headerName: "#", width: "50" },
    { field: "id", headerName: "Kode Kontak", width: "150" },

    { field: "namaKontak", headerName: "Nama Kontak", width: "200" },
    { field: "nomorHandphone", headerName: "Nomor Handphone", width: "200" },
  ];

  useEffect(() => {
    _getKontak_tersimpan();
  }, []);

  const [_aktif_menu, _sendPesan] = useOutletContext();
  const pesan = JSON.parse(window.localStorage.getItem("akmalo_pesan"));
  const _getKontak_tersimpan = () => {
    const data = JSON.parse(window.localStorage.getItem("akmalo_kontak"));
    const ar_baru = [];
    data.map((list, index) => {
      if (list.check == true) {
        ar_baru.push({
          id: list.id_kontak,
          nomor: index + 1,
          namaKontak: list.nama_kontak,
          nomorHandphone: list.nomor_handphone,
        });
      }
    });
    setKontak(ar_baru);
  };
  const _kirim_pesan = (e) => {
    e.preventDefault();

    if (hasil != kode) {
      window.alert("Jawaban anda tidak benar");
    } else {
      _sendPesan(pesan, kontak);
    }
  };

  return (
    <>
      <div
        className="col-lg-7"
        style={{
          margin: "auto",
        }}
      >
        <div className="card">
          <div className="card-header">
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>Verifikasi Pengiriman Pesan</div>
          </div>
          <div className="card-body">
            Ringkasan Pesan
            <table className="table">
              <tbody>
                <tr>
                  <td width="30%">Judul Pesan</td>
                  <td width="10px">:</td>
                  <td>{pesan.judul}</td>
                </tr>
                <tr>
                  <td width="20%">Isi Pesan Broadcast</td>
                  <td width="10px">:</td>
                  <td>{pesan.pesan}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <div>Kontak Yang di pilh</div>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid style={{ width: "400" }} columns={columns} rows={kontak} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          </div>
          <div className="card-footer">
            <form onSubmit={_kirim_pesan}>
              <div>
                <table>
                  <tr>
                    <td>Kirim Via</td>
                    <td>
                      <select
                        required
                        onChange={(e) => {
                          //.alert(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value={""}>Pilih Platform</option>
                        <option value={"WA"}>WHATASAPP</option>
                        <option value={"SMS"}>SMS</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
              <table width="100%">
                <tr>
                  <td style={{ userSelect: "none" }}>Jawablah Pertanyaan di baawah ini untuk melanjutkan</td>
                  <td width="100">
                    <div style={{ fontWeight: "bold", fontSize: "22px" }}>
                      {angka1} + {angka2} = [...]
                    </div>
                  </td>
                  <td>
                    <input
                      required
                      onChange={(e) => {
                        setKode(e.target.value);
                      }}
                      type="number"
                      style={{ width: "100px" }}
                      placeholder="Masukkan jumlah Captcah di atas"
                      className="form-control"
                    />
                    <div style={{ fontSize: "10px" }}>Masukkan jawaban anda</div>
                  </td>
                  <td width="20px"></td>
                  <td>
                    {" "}
                    <button className="btn btn-primary">Kirim Pesan Sekarang</button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
