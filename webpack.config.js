const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Cuál es el punto de entrada de mi aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Obtiene la ruta donde se encuentra mi carpeta del proyecto
        filename: 'main.js',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './public/index.html',
            filename: './index.html'
        })
    ]
}