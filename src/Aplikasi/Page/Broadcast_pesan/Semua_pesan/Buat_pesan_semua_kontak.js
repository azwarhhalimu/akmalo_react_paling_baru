import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNavigate, useParams } from "react-router-dom";
import Step2_gurp from "./Step2_grup";
const Buat_pesan_semua_kontak = () => {
  const steps = ["Buat redaksi pesan yang akan di broadcast", "Pilih Kontak", "Verifikasi Pesan"];

  const params = useParams();
  const navigasi = useNavigate();
  const [step, setStep] = useState(0);
  const next = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => {
            navigasi(-1);
          }}
          className="btn btn-danger"
        >
          <i className="fa fa-chevron-left" />
          Kembali
        </button>
        <h3>Buat Pesan {params.id == "grup" ? "Grup" : "Semua Kontak"}</h3>
      </div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div style={{ height: "30px" }}></div>
      {step == 0 ? <Step1 next={next} /> : step == 1 ? params.id == "grup" ? <Step2_gurp next={next} /> : <Step2 next={next} /> : <Step3 />}
    </>
  );
};

export default Buat_pesan_semua_kontak;
