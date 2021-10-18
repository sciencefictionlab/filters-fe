import axios from "axios";

const _axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  /*adapter: cache.adapter*/
});

export default _axios;
