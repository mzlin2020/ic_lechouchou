import axios from "axios";

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: "api/",
      timeout: 5000,
    });

    // 响应拦截(过滤掉axios的增加的数据)
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
