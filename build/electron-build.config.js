const pkg = require('../package.json');
const distDir = 'dist';

module.exports = {
  productName: pkg.name,
  compression: 'maximum',
  win: {
    target: 'nsis',
    rfc3161TimeStampServer: 'http://sha256timestamp.ws.symantec.com/sha256/timestamp',
    signingHashAlgorithms: ['sha256'],
    requestedExecutionLevel: 'highestAvailable',
  },
  nsis: {
    differentialPackage: false,
    artifactName: `${pkg.name}-${pkg.version}`+'.${env.ARCH}${env.ENV}.${ext}',
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    runAfterFinish: false,
    perMachine: true,
    deleteAppDataOnUninstall: true,
    createStartMenuShortcut: true,
    createDesktopShortcut: true,
    menuCategory: pkg.name,
  },
  linux: {
    target: 'AppImage',
    maintainer: 'test0',
    vendor: 'test1',
    description: pkg.description,
  },
  directories: {
    output: 'release',
  },
  appId: pkg.name,
  asar: true,
  extraMetadata: {
    main: 'main.js',
  },
  files: [
    {
      from: '.',
      filter: ['package.json'],
    },
    {
      from: `${distDir}/main`,
    },
    {
      from: `${distDir}/renderer-dll`,
    },
  ],
  extraResources: [
    'libraries',
    {
      from: `${distDir}/renderer`,
      to: 'renderer',
    },
    {
      from: `download`,
      to: 'download1',
    },
    {
      from: `download/`,
      to: 'download2',
    }
  ],
  extraFiles: [
    {
      from: `download`,
      to: 'download3',
    }
  ],
}