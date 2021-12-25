const path = require("path");

module.exports = {
  // 项目打包存放的文件夹
  outputDir: "./build",

  //起别名
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src"),
      components: "@/components",
    };
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://120.25.202.60:8080/",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
};
