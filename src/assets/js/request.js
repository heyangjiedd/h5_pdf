
import axios from 'axios';
const baseRequest = axios.create({
  baseURL: 'http://api.edu2tech.cn/',
  timeout: 100000,
  headers: { 'Content-Type': 'application/json' }
});
import store from "@/store/index";


//请求拦截
baseRequest.interceptors.request.use((request) => {
  //请求类型判断
  if (request.method == 'GET') { //如果是get

  }
  if (request.method == 'POST') { //如果是post

  }
  return request;
});

//响应拦截
baseRequest.interceptors.response.use((response) => {
  let res = response.data;
  return res
},
  (error) => {

  }
)



export default baseRequest;

