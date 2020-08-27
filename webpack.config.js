const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {// 以哪个模块为入口
    index_bundle: './src/index.js',
  },
  output: {// 打包好的文件存放在哪里，以及怎么命名
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {// 使用 babel-loader 编译 es6/7/8 和 jsx 语法
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [// 指定自己的 html 文件模板，也可以指定生成的 html 的文件名
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  }
};
