import axios from "axios";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Componen_page/Footer";
import React from "react";
import Loading from "./Componen_page/Loading";
import Nav_top from "./Componen_page/Nav_top";
import Sidebar from "./Componen_page/Sidebar";
import baseUrl from "./GlobalVariabel";
import qs from "query-string";
import "./Import_all_css.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Group from "./Page/Group";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Main_template = () => {
  const [menu, setMenu] = useState("");
  const [open, setOpen] = useState(false);
  const [aktifMenu, setAktifMenu] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const btn_menu = () => {
    menu == "" ? setMenu("toggled") : setMenu("");
  };
  const _aktif_menu = (menu) => {
    setAktifMenu(menu);
  };

  const _sendPesan = (pesan, kontak) => {
    setLoading(true);
    axios
      .post(
        baseUrl("broadcast_pesan/kirim_pesan.php"),
        qs.stringify({
          vPesan: JSON.stringify(pesan),
          vKontak: JSON.stringify(kontak),
          grup: window.localStorage.getItem("akmalo_grup"),
        })
      )
      .then((respon) => {
        if (respon.data.status == "pesan_terkirim");
        {
        }
        setLoading(false);
        setOpen(true);
        if (location.pathname == "/pesan/buat_pesan_semua_kontak") {
          navigate("/pesan");
        } else if (location.pathname == "/pesan/buat_pesan/grup") {
          navigate("/pesan");
        }
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      {loading == true && <Loading />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Pesan Berhasil Terikirm
        </Alert>
      </Snackbar>
      <div id="page-top" className="sidebar-toggled">
        <div id="wrapper">
          {/* Sidebar */}
          <Sidebar aktif_menu={aktifMenu} menu={menu} />
          {/* Sidebar */}
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* TopBar */}
              <Nav_top trigger={btn_menu} />
              {/* Topbar */}
              {/* Container Fluid*/}
              <div>
                <Outlet context={[_aktif_menu, _sendPesan]} />
              </div>

              {/* Footer */}
            </div>
            <Footer />
            {/* Footer */}
          </div>
        </div>
        {/* Scroll to top */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
};

export default Main_template;
