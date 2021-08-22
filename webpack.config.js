const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const webpackConfig = {
  mode: "development",
  entry: "/src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.bundle.js",
  },
  alias: {
    "@screen": path.resolve(__dirname, "./src/screen"),
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts|tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Janken",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = webpackConfig;
