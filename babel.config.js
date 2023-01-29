// module.exports = {
//   presets: [
//     '@babel/preset-env', // 👉 根据配置的目标浏览器或者运行环境，选择对应的语法包，从而将代码进行转换
//     '@babel/preset-react', // 👉 react 语法包，让我们可以使用 React ES6 Class Component 的写法，支持JSX、TSX语法格式
//     '@babel/preset-typescript', // 👉 https://github.com/babel/babel/issues/10570
//   ],
//   plugins: [
//     '@babel/plugin-transform-runtime', // 👉 官方提供的插件，作用是减少冗余的代码
//     [
//       '@babel/plugin-transform-modules-commonjs', // 👉 将 ECMAScript modules 转成 CommonJS.
//       {
//         allowTopLevelThis: true,
//         loose: true,
//         lazy: true,
//       },
//     ],
//     [
//       "import", {
//         "libraryName": "antd",
//         "libraryDirectory": "es",
//         "style": "css"
//       }],
//     ["@babel/plugin-proposal-class-properties"]
//   ]
// }

//    "build": "concurrently \"webpack --config ./config/webpack.prod.js\" \"webpack --config ./config/webpack.preload.prod.js\" \"webpack --config ./build/webpack.main.prod.js\"",




// "build": {
//   "appId": "eoe_player",
//   "productName": "eoe_player",
//   "copyright": "Copyright © 2022 ${author}",
//   "files": [
//     "dist/**/*",
//     "package.json",
//     "node_modules/"
//   ],
//   "extraFiles": [
//     {
//       "from": "./public/",
//       "to": "extraFiles/"
//     }
//   ],
//   "extraResources": [
//     {
//       "from": "./public/",
//       "to": "extraResources/"
//     }
//   ],
//   "directories": {
//     "buildResources": "assets",
//     "output": "release"
//   },
//   "win": {
//     "icon": "./public/icon.icns",
//     "requestedExecutionLevel": "highestAvailable",
//     "target": [
//       "nsis"
//     ]
//   },
//   "nsis": {
//     "oneClick": false,
//     "allowElevation": true,
//     "perMachine": true,
//     "warningsAsErrors": false,
//     "allowToChangeInstallationDirectory": true,
//     "createDesktopShortcut": "always",
//     "createStartMenuShortcut": true,
//     "shortcutName": "eoe_player",
//     "include": "./installer.nsh"
//   }
// },