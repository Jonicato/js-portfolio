const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Cuál es el punto de entrada de mi aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Obtiene la ruta donde se encuentra mi carpeta del proyecto
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]' // Agrega una serie de caracteres aleatorios
    },
    resolve: {
        extensions: ['.js'] // Extensiones que debe identificar webpack para leer los archivos de nuestro proyecto
    }, // Hacia dónde vamos a enviar lo qu va a preparar webpack
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules: [
            {
                test: /\.m?js$/, // Qué tipo de extensiones voy a trabajar
                exclude: /node_nodules/, // Ignora los módulos de la carpeta
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[contenthash].[ext]',
                        outputPath: './assets/fonts',
                        publicPath: './assets/fonts',
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ],
    optimization: {
        minimize: true
    }
}