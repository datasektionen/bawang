module.exports = {
  modify: (config, {target, dev}, webpack) => {
    if(target === 'node' && !dev) {
      const definitions = config.plugins.find(plugin => plugin.constructor.name === "DefinePlugin").definitions
      delete definitions['process.env.PORT']
      if(definitions["process.env.RAZZLE_PUBLIC_DIR"] === '/tmp/build/build/public') {
        definitions["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"'
      }

    }
    return config
  }
