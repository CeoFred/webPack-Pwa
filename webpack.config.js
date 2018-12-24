const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
        new CleanWebpackPlugin(['dist']),//cleans up the dist folder before build
         new HtmlWebpackPlugin({
         title: 'Progressive we Application'
         }),
         new WorkboxPlugin.GenerateSW({
                // these options encourage the ServiceWorkers to get in there fast 
                 // and not allow any straggling "old" SWs to hang around
                 clientsClaim: true,
                 skipWaiting: true
               })
       ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
        rules: [
           {
            // webpack uses a regular expression to determine which files it 
            // should look for and serve to a specific loader. In this case any
            //  file that ends with .css will be served to the style-loader 
            //and the css-loader.
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
           },
           {
                   test: /\.(png|svg|jpg|gif)$/,
                     use: [
                       'file-loader'
                     ]
                   }
         ]
       }
};