import { Popover } from "react-tiny-popover";
import { useState } from "react";
import Import_template from "./Import_template";
import { useParams } from "react-router-dom";
const Step1 = (props) => {
  const [pesan, setPesan] = useState();
  const [judulPesan, setJudulPesan] = useState();
  const [import_template, setImport_template] = useState(false);
  const gunakan_template = (id_template, nama_template, template) => {
    setPesan(nama_template);
    setImport_template("");
  };
  const _simpan_pesan = (e) => {
    e.preventDefault();
    window.localStorage.setItem(
      "akmalo_pesan",
      JSON.stringify({
        judul: judulPesan,
        pesan: pesan,
      })
    );
    alert("Pesan berhasil di set");
    //setStep(1);
    props.next();
  };
  return (
    <>
      <div className="row">
        <div className="col-7" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header">
              <div>
                <b>Buat Redaksi Pesan</b>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={_simpan_pesan}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Judul Pesan</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setJudulPesan(e.target.value);
                    }}
                    required
                    className="form-control"
                    placeholder="Masukkan judul pesan..."
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Judul pesan, merupakan informasi ringkas mengenai pesan yang ingin di broadcast
                  </small>
                </div>
                <hr />

                <div className="form-group">
                  <Popover isOpen={import_template} positions={["left"]} content={<Import_template trigger={gunakan_template} />}>
                    <button
                      type="button"
                      onClick={() => {
                        setImport_template(import_template == true ? false : true);
                      }}
                      className="btn btn-sm btn-danger float-right"
                    >
                      Import Dari Template
                    </button>
                  </Popover>

                  <label htmlFor="exampleInputEmail1">Isi Pesan Broadcast</label>
                  <textarea
                    value={pesan}
                    required
                    className="form-control"
                    placeholder="Masukkan   pesan broadcast..."
                    onChange={(e) => {
                      setPesan(e.target.value);
                    }}
                  ></textarea>
                  <small id="emailHelp" className="form-text text-muted">
                    Pesan Broadcast bisa di import dari tempalte
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">
                  Selanjutnya
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
