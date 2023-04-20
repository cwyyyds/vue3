import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// 引入mock
import { viteMockServe } from 'vite-plugin-mock'

// 引入element plus组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const resolve = (dir) => path.resolve(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  // root: resolve('./src'),
  base: './', //默认/配置文件的根目录为相对路径
  plugins: [
    vue(),
    // mock服务
    viteMockServe({
      supportTs: false,
      logger: false,
      mockPath: './src/mock/',
    }),

    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      //设置别名
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8081, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 8081,
    },
    host: true, //可以设置固定的值或者是布尔值, 设置后,才会有NetWork
    open: true, //运行自动打开浏览器
    cors: true, // 允许跨域
    // 设置 https 代理
    // proxy: {
    //   '/api': {
    //     target: 'xxxx', // 接口基地址
    //     changeOrigin: true,
    //     rewrite: (path: string) => {
    //       console.log(path)
    //       return path.replace(/^\/api/, '')
    //     },
    //   },
    // },
  },
  build: {
    chunkSizeWarningLimit: 1500, //提高报警限制,把警告限制提高到1500kb
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
      manualChunks(id) {
        //静态资源分拆打包
        if (id.includes('node_modules')) {
          return id
            .toString()
            .split('node_modules/')[1]
            .split('/')[0]
            .toString()
        }
      },
    },
  },
})
