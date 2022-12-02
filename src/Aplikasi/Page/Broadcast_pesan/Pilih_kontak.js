import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../GlobalVariabel";

const Pilih_kontak = () => {
  const [data, setData] = useState([]);
  const [cKontak, setCKontak] = useState([]);
  useEffect(() => {
    _load();
  }, []);
  const _load = () => {
    axios.post(baseUrl("broadcast_pesan/get_list_kontak.php")).then((respon) => {
      respon.data.data.map((list, index) => {
        setCKontak((cKontak) => [
          ...cKontak,
          {
            id_kontak: list.id_kontak,
            check: true,
            nama_kontak: list.nama_kontak,
            nomor_handphone: list.nomor_handphone,
          },
        ]);
      });
      return;
    });
  };
  const _handleCheck = (id) => {
    const array_baru = cKontak.map((list, index) => {
      if (id == list.id_kontak) {
        return { ...list, check: list.check == true ? false : true };
      } else {
        return list;
      }
    });
    setCKontak(array_baru);
    console.log(cKontak);
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="card" style={{ width: "500px" }}>
        <div className="card-header">
          <div>Pilhi Kontak</div>
          <button
            onClick={() => {
              console.log(cKontak);
            }}
          >
            pilhi
          </button>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <td>No</td>
                <td>Id</td>
                <td>Nama </td>
                <td>NoHP</td>
                <td>Opsi</td>
              </tr>
            </thead>
            <tbody>
              {cKontak.map((list, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{list.id_kontak}</td>
                  <td>{list.nama_kontak}</td>
                  <td>{list.nomor_handphone}</td>
                  <td>
                    <input
                      type={"checkbox"}
                      onClick={(e) => {
                        _handleCheck(list.id_kontak);
                      }}
                      defaultChecked={list.check}
                      value={list.check}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Pilih_kontak;
