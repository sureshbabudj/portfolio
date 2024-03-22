const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: ["./src/js/main.js"], 
    styles: ['./src/scss/styles.scss']
  },
  output: {
    // filename: "[name].[ext]",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 9090,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "./dist/img/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        dependency: { not: ["url"] },
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: '[name].css',
  })]
};
