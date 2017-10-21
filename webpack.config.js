const path = require("path");
const htmlwp = require("html-webpack-plugin");
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "/dist"),
        filename: 'build.js'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: ['url-loader?limit=10240']
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlwp({
            filename: 'index.html',
            template: 'index.html'
        })
    ]
}