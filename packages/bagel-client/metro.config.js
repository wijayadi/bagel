const path = require('path');

const watchFolders = [
  path.resolve(__dirname + '/..'),
  path.resolve(__dirname + '/../../node_modules')
];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders
};
