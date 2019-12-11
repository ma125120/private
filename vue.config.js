module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  css: {
    loaderOptions: {
      scss: {
        // 根据自己样式文件的位置调整
        prependData: `@import "@/styles/global.scss";`
      }
    }
  }
};
