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
  configureWebpack: {
    devtool: 'none'
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000/",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true,
      },
    },
  },
};
