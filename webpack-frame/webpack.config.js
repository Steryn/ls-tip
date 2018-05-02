// webpack.config.js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
    }, // 入口文件
    output: {
        filename: 'bundle.[hash:4].js', // 打包后的文件名称,[name]可以将出入口文件名称对应
        path: path.resolve('dist') // 打包后的目录，必须是绝对路径
    }, // 出口文件
    module: {
        rules: [{
            test: /\.css$/, // 解析css
            use: ExtractTextWebpackPlugin.extract({
                // 将css用link的方式引入就不再需要style-loader了
                use: 'css-loader',
                publicPath: '../'
            })
        }, {
            test: /\.css$/, //css前缀
            use: ['postcss-loader']
        }, {
            test: /\.(jpe?g|jpg|png|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                    outputPath: 'images/' // 图片打包后存放的目录
                }
            }]
        }, {
            test: /\.(htm|html)$/, //html文件引入img
            use: 'html-withimg-loader'
        }, {
            test: /\.(eot|ttf|woff|svg)$/, //字体图标和svg图片
            use: 'file-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            include: /src/, // 只转化src目录下的js
            exclude: /node_modules/ // 排除掉node_modules，优化打包速度
        }]
    }, // 处理对应模块
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        new ExtractTextWebpackPlugin('css/style.css'), //拆分后文件放置的目录路径
        new CleanWebpackPlugin('dist'),
        new webpack.HotModuleReplacementPlugin(), // 热替换，热替换不是刷新
    ], // 对应的插件
    devServer: {
        contentBase: './dist',
        host: 'localhost', // 默认是localhost
        port: 8080, // 端口
        open: true, // 自动打开浏览器
        hot: true // 开启热更新
    }, // 开发服务器配置
    mode: 'development' // 模式配置
}

// 在主要的js文件里写入下面这段代码
// if (module.hot) {
//     // 实现热更新
//     module.hot.accept();
// }