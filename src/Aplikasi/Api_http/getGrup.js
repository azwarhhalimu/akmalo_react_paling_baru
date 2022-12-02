import axios, { Axios } from "axios";
import baseUrl from "../GlobalVariabel";
const dataGrup = [];
const getGrup = await axios.post(baseUrl("grup/simpan_grup.php")).then((respon) => {
  dataGrup = respon.data.data;
});

export default { dataGrup };
