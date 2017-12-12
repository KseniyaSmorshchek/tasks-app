var path = require('path');

module.exports = {
    entry: './public/main.js',
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }
};
