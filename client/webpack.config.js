const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Coffee Shop App',
    inject: 'body',
    template: path.join(__dirname, './src/index.html'),
    // templateParameters: {
    //   titleValue: 'This is Cool!'
    // }
  })],
  devServer: {
    // static: './dist',
    watchFiles: ['./src/index.html'],
    port: 8000,
    compress: true,
    proxy: {
      '*': 'http://localhost:3333'
    }
  },
};