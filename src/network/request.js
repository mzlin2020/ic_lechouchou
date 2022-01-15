import axios from "axios";

// 根据环境赋值不同的BASEURL
const API_BASE_URL = process.env.VUE_APP_BASE_URL

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 5000,
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
