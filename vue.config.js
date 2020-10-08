const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

process.env.VUE_APP_VERSION = require('./package.json').version

let h5pDist = path.join(__dirname, 'node_modules/h5p-standalone/dist');
let h5pDistCopyPathes = [{
    from: h5pDist,
    to: path.join(__dirname, 'public')
},{
    from: h5pDist,
    to: path.join(__dirname, 'dist')
}];

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin(
                { patterns: h5pDistCopyPathes
            })
        ]
    }
}