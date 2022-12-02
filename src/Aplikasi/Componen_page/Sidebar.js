import { Link } from "react-router-dom";

const Sidebar = ({ menu, aktif_menu }) => {
  const getAktif_menu = (cmenu) => {
    return aktif_menu == cmenu ? " active" : "";
  };
  return (
    <>
      <ul className={"navbar-nav sidebar " + menu + " sidebar-light accordion"} id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon">
            <img src="/img/logo/logo2.png" />
          </div>
          <div className="sidebar-brand-text mx-3">RuangAdmin</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className={"nav-item" + getAktif_menu("dashboard")}>
          <Link to={"/"} className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={"nav-item" + getAktif_menu("kontak")}>
          <Link to={"/kontak"} className="nav-link">
            <i className="fas fa-fw fa-address-book" />
            <span>Kontak</span>
          </Link>
        </li>
        <li className={"nav-item" + getAktif_menu("grup-kontak")}>
          <Link to={"/grup-kontak"} className="nav-link">
            <i className="fas fa-fw fa-users" />
            <span>Grup Kontak</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li className={"nav-item" + getAktif_menu("template_pesan")}>
          <Link to={"/template-pesan"} className="nav-link">
            <i className="fas fa-fw fa-envelope" />
            <span>Template Pesan</span>
          </Link>
        </li>
        <li className={"nav-item" + getAktif_menu("pesan")}>
          <Link to={"/pesan"} className="nav-link">
            <i className="fas fa-fw fa-paper-plane" />
            <span>Pesan/Broadcast</span>
          </Link>
        </li>
        <li className={"nav-item" + getAktif_menu("log_pesan")}>
          <Link to={"/log-pesan"} className="nav-link">
            <i className="fas fa-fw fa-archive" />
            <span>Log Pesan Terkirim</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="version" id="version-ruangadmin" />
      </ul>
    </>
  );
};

export default Sidebar;
