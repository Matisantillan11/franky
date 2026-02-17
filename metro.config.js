const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  // Path to your global CSS file
  cssEntryFile: './styles/global.css',
  // Path for auto-generated TypeScript types
  dtsFile: './types/uniwind-types.d.ts',
});
