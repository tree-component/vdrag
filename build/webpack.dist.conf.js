const path = require('path');

const config = {
  context: path.resolve(__dirname, '../'),
  entry: {
    drag: './src/components/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist/drag'),
    filename: '[name].js',
  },
  // devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
};

module.exports = config;
