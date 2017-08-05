var path = require("path");

module.exports = {
  entry: "./app/main.ts",
  output: {
    path: __dirname,
    filename: "dist/app.js"
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
