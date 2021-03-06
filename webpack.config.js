const path = require("path");

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const baseConfig = (mode, target) => {
  return {
    entry: {
      app: "./src/main.tsx",
    },
    mode,
    devtool: "source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
    },
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ["json", "javascript"],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          loader: "ts-loader",
          options: {
            compilerOptions: {
              target,
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    externals: {
      "monaco-editor": "monaco",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],

      alias: {
        react: path.resolve("node_modules/react"),
        "react-dom": path.resolve("node_modules/react-dom"),
      },
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist"),
      pathinfo: false,
    },
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};

module.exports = (env, argv) => {
  console.log(env);
  const mode = "development"; //WEBPACK_SERVE ? "development" : "production";
  return {
    ...baseConfig(mode, "ES2017"),
  };
};
