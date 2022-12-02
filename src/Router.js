import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main_template from "./Aplikasi/Main_template";
import Detail_pesan from "./Aplikasi/Page/Broadcast_pesan/Detail_pesan";
import Buat_pesan_semua_kontak from "./Aplikasi/Page/Broadcast_pesan/Semua_pesan/Buat_pesan_semua_kontak";
import Dashboard from "./Aplikasi/Page/Dashboard";
import Group from "./Aplikasi/Page/Group";
import Kontak from "./Aplikasi/Page/Kontak";
import Tambah_kontak from "./Aplikasi/Page/Kontak/Tambah_kontak";
import Log_pesan from "./Aplikasi/Page/Log_pesan";
import Pesan from "./Aplikasi/Page/Pesan_broadcast";
import Template_pesan from "./Aplikasi/Page/Template_pesan";
import Page_not_found from "./Aplikasi/Page_not_found";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Main_template />}>
            <Route path="/" index element={<Dashboard />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/kontak/tambah-kontak" element={<Tambah_kontak />} />
            <Route path="/grup-kontak" element={<Group />} />
            <Route path="/template-pesan" element={<Template_pesan />} />
            <Route path="/pesan" element={<Pesan />} />
            <Route path="/:id/pesan/detail_pesan" element={<Detail_pesan />} />
            <Route path="/pesan/buat_pesan_semua_kontak" element={<Buat_pesan_semua_kontak />} />
            <Route path="/pesan/buat_pesan/:id" element={<Buat_pesan_semua_kontak />} />
            <Route path="/log-pesan" element={<Log_pesan />} />
          </Route>
          <Route path="*" element={<Page_not_found />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
