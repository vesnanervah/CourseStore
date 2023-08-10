const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.WEBPACK_BUILD ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        filename: 'index.html',
      }),
      new FaviconsWebpackPlugin(path.join(__dirname, './src/assets/favicon.ico')), //'src', 'assets',
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.ts$/i,
          use: 'ts-loader',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]',
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
  };
};
