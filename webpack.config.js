const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  mode: "development",
	optimization: {
		// We no not want to minimize our code.
		minimize: false
	}
};
