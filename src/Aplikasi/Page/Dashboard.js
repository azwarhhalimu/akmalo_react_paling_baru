import { sanitizeSortModel } from "@mui/x-data-grid/hooks/features/sorting/gridSortingUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import baseUrl from "../GlobalVariabel";

const Dashboard = () => {
  document.title = "Dashboard";
  const [saldo, setSaldo] = useState({});
  const [pesan, setPesan] = useState([]);
  const [grup, setGrup] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [_aktif_menu] = useOutletContext();
  const navigasi = useNavigate();
  useEffect(() => {
    _aktif_menu("dashboard");
    getBelance();
    getDashboard();
  }, []);
  const getBelance = () => {
    axios.get(baseUrl("get_saldo.php")).then((respon) => {
      setSaldo(respon.data);
    });
  };
  const getDashboard = () => {
    axios.get(baseUrl("dashboard.php")).then((respon) => {
      setDashboard(respon.data);
      setPesan(respon.data.pesan);
      setGrup(respon.data.grup);
    });
  };
  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </div>
        <div className="row mb-3">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Sisa Saldo</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">Rp. {saldo.balance}</div>
                    <div className="mt-2 mb-0 text-muted text-xs">
                      <span className="text-success mr-2">Exp : {saldo.expired}</span>
                      <span></span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-plane fa-2x text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Annual) Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Pengeluran</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">Rp. {dashboard.total_pengeluaran}</div>
                    <div className="mt-2 mb-0 text-muted text-xs">
                      <span className="text-success mr-2">
                        <i className="fas fa-monay" /> 12%
                      </span>
                      <span>Rp. 230/Pesan</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-shopping-cart fa-2x text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* New User Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Kontak Aplikasi</div>
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{dashboard.jumlah_kontak} Kontak</div>
                    <div className="mt-2 mb-0 text-muted text-xs">
                      <span>Data kontak pada aplikasi</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x text-info" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Requests Card Example */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Jumlah Pesan Yang Terkirim</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{dashboard.jpesan_terkirim}</div>
                    <div className="mt-2 mb-0 text-muted text-xs">
                      <span>Sisa Pesan Qouta : [...]</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-warning" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Area Chart */}

          {/* Pie Chart */}

          {/* Invoice Example */}
          <div className="col-xl-8 col-lg-7 mb-4">
            <div className="card">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Pesan Terkirim</h6>
                <button
                  className="m-0 float-right btn btn-danger btn-sm"
                  onClick={() => {
                    navigasi("/pesan");
                  }}
                >
                  View More <i className="fas fa-chevron-right" />
                </button>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>Kode</th>
                      <th>Judul Pesan</th>
                      <th>Pesan</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pesan.map((list, index) => (
                      <tr>
                        <td>
                          <a href="#">{list.id_pesan}</a>
                        </td>
                        <td>{list.judul}</td>
                        <td>{list.pesan}</td>
                        <td>
                          <span className="badge badge-success">Delivered</span>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              navigasi("/" + list.id_pesan + "/pesan/detail_pesan");
                            }}
                            className="btn btn-primary"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer" />
            </div>
          </div>
          {/* Message From Customer*/}
          <div className="col-xl-4 col-lg-5 ">
            <div className="card">
              <div className="card-header py-4 bg-primary d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-light">Grup Pesan</h6>
              </div>
              <div>
                {grup.map((list, index) => (
                  <div className="customer-message align-items-center">
                    <a className="font-weight-bold" href="#">
                      <div className="text-truncate message-title">{list.nama_grup}</div>
                      <div className="small text-gray-500 message-time font-weight-bold">Id Grup : {list.id_grup}</div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*Row*/}

        {/* Modal Logout */}
      </div>
    </>
  );
};

export default Dashboard;
