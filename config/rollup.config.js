const rollupConfig = require('@ionic/app-scripts/config/rollup.config');
const replace = require('rollup-plugin-replace');
const isProd = (process.env.IONIC_ENV === 'prod');

const rollupConfigReplaceEnviroment = replace({
    exclude: 'node_modules/**',
    // use the /config/env.dev as the default import(!), no stub needed.
    // note we only replace the "last" part of the import statement so relative paths are maintained
    '/config/env.dev' : ( isProd ? '/config/env.prod' : '/config/env.dev'),
});

rollupConfig.plugins = rollupConfig.plugins || [];
rollupConfig.plugins.splice(0, 0, rollupConfigReplaceEnviroment);

module.exports = rollupConfig;
