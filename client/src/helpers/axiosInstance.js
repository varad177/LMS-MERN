import axios from "axios";

// const BACE_URL = "http://localhost:5000/api/v1/";
// const BACE_URL = "https://dark-tam-hare.cyclic.app/";
const BACE_URL = "";
const axiosinstance = axios.create();
axiosinstance.defaults.baseURL = BACE_URL;
// axiosinstance.defaults.withCredentials = true;

export default axiosinstance;
