import axios from "axios";
import { forwardRef, useImperativeHandle, useState } from "react";
import baseUrl from "../../GlobalVariabel";
import qs from "query-string";
const Edit_template = forwardRef((props, ref) => {
  const [namaTemplate, setNamaTemplate] = useState(props.nama_template);
  const [template, setTemplate] = useState(props.template);
  const _update = [namaTemplate, template];
  useImperativeHandle(ref, () => ({
    update_template() {
      axios
        .post(
          baseUrl("template_pesan/update_template.php"),
          qs.stringify({
            id_template: props.id_template,
            nama_template: namaTemplate,
            template: template,
          })
        )
        .then((respon) => {
          if (respon.data.status == "update_template") {
            alert("Data berhasil di update");
            props.setReload(props.reload + 1);
          }
        });
    },
  }));
  return (
    <>
      <td>
        <input
          value={namaTemplate}
          onChange={(e) => {
            setNamaTemplate(e.target.value);
          }}
          placeholder="Masukkan nama template"
          type="text"
          className="form-control"
        />
      </td>
      <td>
        <textarea
          onChange={(e) => {
            setTemplate(e.target.value);
          }}
          placeholder="Masukkan isi tmeplate"
          type="text"
          value={template}
          className="form-control"
        ></textarea>
      </td>
    </>
  );
});

export default Edit_template;
