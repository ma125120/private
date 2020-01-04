
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
  },
  configureWebpack: () => {
    const plugins = [];
    
    return {
      externals: {
        "vue": "Vue",
        "element-ui": "ELEMENT"
      },
    };
  },
  chainWebpack: config => {
		//*//
    if (process.env.NODE_DEV === 'production') {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
		
	},
};
