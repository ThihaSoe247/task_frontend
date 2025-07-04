import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

export default axios;
