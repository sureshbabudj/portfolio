const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

// eslint-disable-next-line no-unused-vars
module.exports = function (env, args) {
  return {
    mode: 'development',
    entry: "./src/js/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "./js/index.bundle.js",
    },
    // Defined to simplify complicated relative DIR addressing
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
    // Generate sourcemaps for proper error messages
    devtool: "source-map",
    performance: {
      // Turn off size warnings for entry points
      hints: false,
    },
    stats: {
      // Turn off information about the built modules.
      modules: false,
      colors: true,
    },
    /// -------
    /// MODULES
    /// -------
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: "html-srcsets-loader",
            options: {
              attrs: [":src", ":srcset"],
              interpolate: true,
              minimize: false,
              removeComments: false,
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                publicPath: "../",
              },
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            {
              loader: "resolve-url-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: {
                    autoprefixer: {},
                  },
                },
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(js)$/,
          loader: "babel-loader",
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext]",
          },
        },
        {
          test: /(favicon\.ico|site\.webmanifest|browserconfig\.xml|robots\.txt|humans\.txt)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?[a-z0-9=.]+)?$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name]-[hash][ext][query]",
          },
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          type: "asset/resource",
          generator: {
            filename: "img/[name]-[hash][ext][query]",
          },
        },
      ],
    },
    /// -------
    /// PLUGINS
    /// -------
    plugins: [
      // sync html files dynamically
      ...glob.sync("src/index.html").map((fileName) => {
        return new HtmlWebpackPlugin({
          template: fileName,
          minify: false, // Disable minification during production mode
          filename: fileName.replace("src/", ""),
          hash: true,
        });
      }),
      new ESLintPlugin({
        emitError: true,
        emitWarning: true,
        context: path.resolve(__dirname, "src/js"),
      }),
      new StylelintPlugin({
        emitErrors: true,
        emitWarning: true,
        configFile: path.resolve(__dirname, ".stylelintrc.js"),
        context: path.resolve(__dirname, "src/styles"),
      }),
      new MiniCssExtractPlugin({
        filename: "./scss/styles.css",
        experimentalUseImportModule: false,
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"], // This line provides Popper globally
      }),
    ],

    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      compress: true,
      port: 1234,
      hot: true,
    },
  };
};

// Read this
// eslint-disable-next-line no-console
console.log(
  "\x1b[41m\x1b[38m%s\x1b[0m",
  "\n[REMEMBER TO RESTART THE SERVER WHEN YOU ADD A NEW HTML FILE.]\n"
);
