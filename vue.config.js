// 引入等比适配插件
const px2rem = require('postcss-px2rem')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 配置基本大小
const postcss = px2rem({
    // 基准大小 baseSize，需要和rem.js中相同
    remUnit: 16
})

module.exports = {
    lintOnSave: true,
    publicPath:'./',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
    },
}
