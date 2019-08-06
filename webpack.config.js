const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /brutusin-json-forms\/src\/css\/brutusin-json-forms.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /brutusin-json-forms\/src\/css\/brutusin-json-forms.css$/i,
        use: ['to-string-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};