import axios from "axios";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import qs from "query-string";
import baseUrl from "../../GlobalVariabel";

const Edit_kontak = forwardRef((props, ref) => {
  const refx = useRef(null);
  const [nama, setNama] = useState(props._nama);
  const [alamat, setAlamat] = useState(props._alamat);
  const [no_handphone, setNo_handphone] = useState(props._no_handphone);
  useImperativeHandle(ref, () => ({
    _submit() {
      _update();
    },
  }));

  const _update = () => {
    axios
      .post(
        baseUrl("kontak/update_kontak.php"),
        qs.stringify({
          id_kontak: props.id_kontak,
          nama: nama,
          alamat: alamat,
          no_handphone: no_handphone,
        })
      )
      .then((respon) => {
        if (respon.data.status == "data_terupdate") {
          window.alert("Data berhasil di update");
          props.setReload(props.reload + 1);
        }
      });
  };

  return (
    <>
      <td>
        <input
          onChange={(e) => {
            setNama(e.target.value);
          }}
          autoFocus
          placeholder="Masukkan nama"
          type={"text"}
          value={nama}
          className="form-control"
        />
      </td>
      <td>
        <textarea
          onChange={(e) => {
            setAlamat(e.target.value);
          }}
          placeholder="Masukkan alamat"
          className="form-control"
        >
          {alamat}
        </textarea>
      </td>
      <td>
        {" "}
        <input
          onChange={(e) => {
            setNo_handphone(e.target.value);
          }}
          type={"text"}
          value={no_handphone}
          className="form-control"
        />
      </td>
    </>
  );
});

export default Edit_kontak;
