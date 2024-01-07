import axios from "axios";

export default axios.create({
  baseURL: 'http://3.147.63.116:3000/',
  withCredentials: true
});
