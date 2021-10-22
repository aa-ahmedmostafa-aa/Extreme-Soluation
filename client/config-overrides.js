// config-overrides.js
const webpack =require('webpack');
module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    config.plugins.push(
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
          }),
    )
    return config
}