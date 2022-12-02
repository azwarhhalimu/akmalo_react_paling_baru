import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../GlobalVariabel";

const Import_template = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.post(baseUrl("broadcast_pesan/get_list_template.php")).then((respon) => {
      setData(respon.data.data);
    });
  }, []);
  return (
    <>
      <div className="card" style={{ width: "500px" }}>
        <div className="card-header">
          <div>Pilih Template</div>
        </div>
        <div className="body">
          <table className="table">
            <tr style={{ fontWeight: "bold" }}>
              <td>No</td>
              <td>Nama Template</td>
              <td>Template</td>
              <td></td>
            </tr>
            {data.map((list, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{list.nama_template}</td>
                <td>{list.template}</td>
                <td>
                  <button
                    onClick={() => {
                      props.trigger(list.id_template, list.nama_template, list.template);
                    }}
                    className="btn"
                  >
                    [Gunakan]
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Import_template;
