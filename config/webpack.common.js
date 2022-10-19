const path = require("path");
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "~": path.resolve(__dirname, "../"),
    },
    extensions: [".ts", ".tsx", ".js", "jsx"],
    mainFiles: ["index.ts", "index.js", "index.tsx", "index.jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[fullhash].[ext]'
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            // 有同样配置的 loader 会共享一个 worker 池(worker pool)
            options: {
              // 产生的 worker 的数量，默认是 cpu 的核心数
              workers: 4,
        
              // 一个 worker 进程中并行执行工作的数量
              // 默认为 20
              workerParallelJobs: 50,
        
              // 额外的 node.js 参数
              // workerNodeArgs: ['--max-old-space-size', '1024'],
        
              // 闲置时定时删除 worker 进程
              // 默认为 500ms
              // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
              poolTimeout: 2000,
        
              // 池(pool)分配给 worker 的工作数量
              // 默认为 200
              // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
              poolParallelJobs: 50,
        
              // 池(pool)的名称
              // 可以修改名称来创建其余选项都一样的池(pool)
              name: "my-pool"
            }
          },
        'babel-loader?cacheDirectory=true'
      ]
      },
      {
        test: /\.(css|less)$/,
        // exclude: /node_modules/,
        use: [
          "style-loader",
          //  "css-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          },
          "less-loader",
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      NODE_ENV: `${process.env.NODE_ENV}`,
      __dirname: '__dirname',
    })
  ]
}