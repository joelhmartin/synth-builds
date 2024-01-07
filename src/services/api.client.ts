import axios from "axios";

export default axios.create({
  baseURL: 'https://3.147.63.116:3000/',
  withCredentials: true
});
