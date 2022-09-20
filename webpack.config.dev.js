const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: './src/index.js', // Cuál es el punto de entrada de mi aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Obtiene la ruta donde se encuentra mi carpeta del proyecto
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]' // Agrega una serie de caracteres aleatorios
    },
    mode: 'development',
    devtool: 'source-map', // Crea el mapa del código de nuestro proyecto
    resolve: {
        extensions: ['.js'], // Extensiones que debe identificar webpack para leer los archivos de nuestro proyecto
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    }, // Hacia dónde vamos a enviar lo que va a preparar webpack
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
                        outputPath: '../assets/fonts',
                        publicPath: '../assets/fonts',
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
        }),
        new Dotenv(),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
        watchFiles: path.join(__dirname, './**'), // Esto observa los cambios en todos nuestros archivos y actualiza el navegador
        compress: true,
        historyApiFallback: true, // Esto nos permite tener un historial de lo que sucede en el navegador
        port: 3006,
        open: true, // Hace que se abra en el navegador
    },
}