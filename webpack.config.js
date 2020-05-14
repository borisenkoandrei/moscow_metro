const path = require('path');
const { env: mode } = process.env;

module.exports = {
    mode: 'development',
    entry: './src/app/index.ts',
    devtool: 'inline-source-map',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-transform-arrow-functions',
                        '@babel/plugin-transform-spread',
                        '@babel/plugin-transform-object-assign',
                    ]
                  }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'moscow_metro.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname),
        watchContentBase: true,
        compress: true,
        host: '0.0.0.0',
        port: 3000,
        disableHostCheck: true
      }
};
