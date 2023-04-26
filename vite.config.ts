import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// 引入mock
import { viteMockServe } from 'vite-plugin-mock'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// 引入element plus组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置路径别名
    alias: {
      //设置别名
      '@': pathSrc,
    },
  },
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

    Icons({
      // scale: 1, // 缩放
      compiler: 'vue3', // 编译方式
      // defaultClass: '', // 默认类名
      // defaultStyle: '', // 默认样式
      autoInstall: true,
      // jsx: 'react' // jsx支持
    }),

    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

      // dts 第一个参数跟上面一样设置为 true 也是会自动生成一个 d.ts 的文件
      // 第二个参数就是dirs就是配置你的目录，你可以设置src,或者src/componets或者你需要配置的地方的组件让他自动导入，其他的组件不管
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
          // alias: { park: 'icon-park' } 集合的别名
          enabledCollections: ['ep'], // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
        }),

        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      // dts 第一个参数跟上面一样设置为 true 也是会自动生成一个 d.ts 的文件
      // 第二个参数就是dirs就是配置你的目录，你可以设置src,或者src/componets或者你需要配置的地方的组件让他自动导入，其他的组件不管
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
  ],

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
