const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  modify: (config, {target, dev}, webpack) => {
    if(target === 'node' && !dev) {

      // fix for dokku/heroku
      const definitions = config.plugins.find(plugin => plugin.constructor.name === "DefinePlugin").definitions
      delete definitions['process.env.PORT']
      if(definitions["process.env.RAZZLE_PUBLIC_DIR"] === '/tmp/build/build/public') {
        definitions["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"'
      }

    }
    config.devtool = 'sourcemap'

    if(target === 'web' && !dev) {
      config.optimization.minimizer = [new TerserPlugin()]
    }

    return config
  }
}
