import axios from "axios";
import localCache from "@/utils/cache.js";

// 根据环境赋值不同的BASEURL
const API_BASE_URL = process.env.VUE_APP_BASE_URL;

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
    });

    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 获取token
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // 响应拦截(过滤掉axios的增加的外层数据)
    instance.interceptors.response.use(
      (res) => {
        res = res.data;
        return res;
      },
      (err) => {
        console.log(err);
      }
    );

    instance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
