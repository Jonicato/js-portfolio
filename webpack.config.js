const path = require('path');

module.exports = {
    entry: './src/index.js', // Cuál es el punto de entrada de mi aplicación
    output: {
        path: path.resolve(__dirname, 'dist'), // Obtiene la ruta donde se encuentra mi carpeta del proyecto
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js'] // Extensiones que debe identificar webpack para ller los archivos de nuestro proyecto
    } // Hacia dónde vamos a enviar lo qu va a preparar webpack
}