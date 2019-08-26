const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: 'dist',
        }
      },
      {
        test: /.\/src\/css\/style.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/brutusin-json-forms\/dist\/css\/brutusin-json-forms.min.css$/i, /jsoneditor\/dist\/jsoneditor.min.css$/i],
        use: ['to-string-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'demo/dist'),
    filename: 'bundle.js'
  }
};