const webpack = require('webpack');
module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if(target === 'node') {
      const definePlugin = config.plugins.find(p => p.constructor.name === 'DefinePlugin')
      if(definePlugin) {
        delete definePlugin.definitions['process.env.PORT']
      }
    }

    return config;
  },
};
