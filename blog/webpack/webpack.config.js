const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 相对路径转绝对路径
const resolvePath = (_path) => path.resolve(__dirname, _path);

module.exports = {
  entry: resolvePath("../src/index.tsx"),
  output: {
    path: resolvePath("../dist"),
    filename: "script/[name].js",
    clean: true,
  },

  // 配置；loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                // 当auto匹配时才进行modules配置
                auto: (resourcePath) => {
                  return /\.module\.s[ac]ss$/.test(resourcePath)
                },
                // 生成的类名为类名+hash
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [resolvePath("../src/assets/css/mixin.scss")],
            },
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: resolvePath("../src"),
        loader: "babel-loader",
        options: {
          // 开启 babel 缓存
          cacheDirectory: true,
          // 关闭缓存压缩
          cacheCompression: false,
        },
      },
    ],
  },

  // 配置plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath("../public/index.html"),
    })
  ],

  resolve: {
    alias: {
      "@": resolvePath("../src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  mode: "development",

  devtool: "cheap-module-source-map",

  devServer: {
    host: "localhost",
    port: 8081,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
