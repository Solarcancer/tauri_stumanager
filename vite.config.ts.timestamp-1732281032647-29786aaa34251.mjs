// build/vite/build.ts
function createViteBuild() {
  const viteBuild = {
    target: "es2015",
    // 指定输出路径
    outDir: "dist",
    cssTarget: "chrome80",
    // 指定生成静态资源的存放路径
    assetsDir: "static",
    // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在块加载时插入 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件。
    sourcemap: false,
    // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    brotliSize: false,
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     // 打包清除console
    //     drop_console: true,
    //   },
    // },
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2e3
  };
  return viteBuild;
}

// build/vite/css.ts
function createViteCSS() {
  const viteCSS = {
    preprocessorOptions: {
      // 配置scss全局样式以及变量
      scss: {
        api: "modern-compiler",
        charset: false,
        additionalData: `
          @use "@/styles/var/element/theme/index.scss" as *;
          @use "@/styles/var/index.scss" as *;
        `,
        javascriptEnabled: true
      }
    }
  };
  return viteCSS;
}

// build/vite/esbuild.ts
function createViteEsbuild(isBuild) {
  return {
    pure: isBuild ? ["console"] : []
  };
}

// build/vite/optimizeDeps.ts
function createViteOptimizeDeps() {
  const viteOptimizeDeps = {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: ["element-plus/es/locale/lang/zh-tw", "element-plus/es/locale/lang/en"],
    // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项。如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
    entries: [],
    // 在预构建中强制排除的依赖项。
    exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
  };
  return viteOptimizeDeps;
}

// build/vite/plugin/index.ts
import vue from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Inspect from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-inspect@0.8.7_rollup@2.79.1_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0_/node_modules/vite-plugin-inspect/dist/index.mjs";

// build/vite/plugin/style.ts
function configStylePlugin() {
  const plugin = [];
  return plugin;
}

// build/vite/plugin/svg.ts
import path from "path";
import process from "process";
import { createSvgIconsPlugin } from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function configSvgPlugin() {
  const svgPlugin = createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // 压缩配置
    // svgoOptions: false,
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]"
  });
  return svgPlugin;
}

// build/vite/plugin/compress.ts
import viteCompression from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0_/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, disable = false) {
  let options = {};
  if (compress === "gzip") {
    options = {
      ext: ".gz",
      algorithm: "gzip"
    };
  }
  if (compress === "brotli") {
    options = {
      ext: ".br",
      algorithm: "brotliCompress"
    };
  }
  const plugin = [
    viteCompression({
      verbose: true,
      disable,
      ...options
    })
  ];
  return plugin;
}

// build/vite/plugin/mock.ts
import { vitePluginFakeServer } from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-fake-server@2.1.2/node_modules/vite-plugin-fake-server/dist/index.mjs";
function configMockPlugin() {
  return vitePluginFakeServer({
    logger: false,
    include: "mock",
    infixName: false,
    enableProd: true
  });
}

// build/vite/plugin/pwa.ts
import { VitePWA } from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-pwa@0.20.5_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0__workbox-build_23c72jublynlmwlzodfzjmxlhy/node_modules/vite-plugin-pwa/dist/index.js";
function configPwaPlugin() {
  const options = {
    includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
    logLevel: "silent",
    workbox: {
      maximumFileSizeToCacheInBytes: 3e6
    },
    manifest: {
      name: "\u5C0F\u65AF\u7BA1\u7406\u540E\u53F0\u6A21\u677F",
      short_name: "\u5C0F\u65AF\u540E\u53F0\u6A21\u677F",
      description: "\u57FA\u4E8E vue3+vite+element-push \u642D\u5EFA\u7684\u540E\u53F0\u6A21\u677F",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/pwa/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/pwa/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/pwa/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  };
  return VitePWA(options);
}

// build/vite/plugin/visualizer.ts
import process2 from "process";
import { visualizer } from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function configVisualizerPlugin() {
  if (process2.env.REPORT === "true") {
    return [
      visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ];
  } else {
    return [];
  }
}

// build/vite/plugin/imagemin.ts
import viteImagemin from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@5.4.9_@types+node@20.9.0_sass@1.79.5_terser@5.24.0_/node_modules/vite-plugin-imagemin/dist/index.mjs";
function configImageminPlugin() {
  return viteImagemin({
    verbose: false,
    // https://github.com/imagemin/imagemin-gifsicle
    gifsicle: {
      optimizationLevel: 3
    },
    // https://github.com/imagemin/imagemin-optipng
    optipng: {
      optimizationLevel: 7
    },
    // https://github.com/imagemin/imagemin-mozjpeg
    mozjpeg: {
      quality: 30
    },
    // https://github.com/imagemin/imagemin-pngquant
    pngquant: {
      quality: [0.8, 0.9]
    },
    // https://github.com/svg/svgo/#what-it-can-do
    svgo: {
      plugins: [
        {
          name: "removeViewBox"
        },
        {
          name: "removeEmptyAttrs",
          active: false
        }
      ]
    }
  });
}

// build/vite/plugin/i18n.ts
import path2 from "path";
import VueI18nPlugin from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/@intlify+unplugin-vue-i18n@5.2.0_@vue+compiler-dom@3.5.12_eslint@9.13.0_jiti@1.21.0__rollup@2_qs73xksi636lwulpoza2sygive/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_dirname = "D:\\TauriProjects\\stu-manager\\build\\vite\\plugin";
function configVueI18nPlugin() {
  return VueI18nPlugin({
    include: [path2.resolve(__vite_injected_original_dirname, "../../../", "./src/locales/modules/**")]
  });
}

// build/vite/plugin/element.ts
import ElementPlus from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/unplugin-element-plus@0.8.0_rollup@2.79.1/node_modules/unplugin-element-plus/dist/vite.mjs";
function configAutoElementStylePlugin() {
  return ElementPlus({
    useSource: true
  });
}

// build/vite/plugin/buildOuteInfo.ts
import { readdir, stat } from "fs";
import { join } from "path";
import dayjs from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import duration from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/plugin/duration.js";
import { green } from "file:///D:/TauriProjects/stu-manager/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";
dayjs.extend(duration);
var tost = `\u{1F929}\u4F60\u597D\uFF01\u5982\u679C\u60A8\u611F\u89C9\u5185\u5BB9\u8FD8\u4E0D\u9519\uFF0C\u5728\u53F3\u8FB9\u94FE\u63A5\u7ED9\u4E2Astar\u54E6\u{1F618}\uFF01https://github.com/jsxiaosi/vue-xs-admin`;
function getdirsize(dir, callback) {
  let size = 0;
  let fileNumber = 0;
  stat(dir, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) return callback(1, stats.size);
    readdir(dir, (err2, files) => {
      if (err2) throw err2;
      if (files.length === 0) return callback(0, 0);
      let count = files.length;
      for (let i = 0; i < files.length; i++) {
        getdirsize(join(dir, files[i]), (_fileNumber, _size) => {
          if (err2) throw err2;
          size += _size;
          fileNumber += _fileNumber;
          if (--count <= 0) {
            callback(fileNumber, size);
          }
        });
      }
    });
  });
}
function bytesToSize(bytes, fixed = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(fixed))} ${sizes[i]}`;
}
function viteBuildOuteInfo() {
  let config;
  let startTime, endTime;
  return {
    // 插件名称
    name: "vite-build-oute-info",
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler: () => {
      }
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    // rollup.rollup在每次开始构建时调用
    buildStart() {
      console.info(["", green(tost), ""].join("\n"));
      if (config.command === "build") {
        startTime = dayjs(/* @__PURE__ */ new Date());
      }
    },
    closeBundle() {
      if (config.command === "build") {
        endTime = dayjs(/* @__PURE__ */ new Date());
        getdirsize(config.build.outDir, (f, s) => {
          console.log(
            `
${green(
              `\u6253\u5305\u5B8C\u6210\u{1F389}\uFF08\u6253\u5305\u6587\u4EF6\u6570\u91CF\uFF1A${f}\uFF0C\u7528\u65F6\uFF1A${dayjs.duration(endTime.diff(startTime)).format("mm\u5206ss\u79D2")}\uFF0C\u6253\u5305\u540E\u7684\u5927\u5C0F\uFF1A${bytesToSize(s)}\uFF09`
            )}`
          );
        });
      }
    }
  };
}
var buildOuteInfo_default = viteBuildOuteInfo;

// build/vite/plugin/index.ts
function createVitePlugins(_isBuild = false, _configEnv) {
  const vitePlugins = [
    // vue({
    //   reactivityTransform: true,
    // }),
  ];
  vitePlugins.push(
    vue(),
    vueJsx()
    // 如果需要
  );
  vitePlugins.push(configStylePlugin());
  vitePlugins.push(configSvgPlugin());
  vitePlugins.push(configCompressPlugin("gzip", true));
  vitePlugins.push(configMockPlugin());
  vitePlugins.push(configPwaPlugin());
  vitePlugins.push(configVisualizerPlugin());
  vitePlugins.push(configImageminPlugin());
  vitePlugins.push(buildOuteInfo_default());
  vitePlugins.push(configVueI18nPlugin());
  vitePlugins.push(Inspect());
  vitePlugins.push(configAutoElementStylePlugin());
  return vitePlugins;
}

// build/vite/resolve.ts
import path3 from "path";
function createViteResolve(_mode, myDirname) {
  const viteResolve = {
    // 引用别名配置
    alias: {
      // 配置@别名
      "@": `${path3.resolve(myDirname, "src")}`,
      // 配置#别名
      "#": `${path3.resolve(myDirname, "types")}`
    },
    // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会干扰 IDE 和类型支持。
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"]
  };
  return viteResolve;
}

// build/vite/server.ts
function createViteServer() {
  const viteServer = {
    // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    host: true,
    // 服务器端口号
    port: 5173,
    // 端口已被占用时是否尝试使用下一个可用的端口 true：直接退出，而不是尝试下一个可用端口 false：尝试下一个可用端口
    strictPort: false,
    // boolean | string 启动项目时自动在浏览器打开应用程序；如果为string，比如"/index.html"，会打开http://localhost:5173/index.html
    // open: true,
    // boolean | CorsOptions  为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
    // cors: true,
    // 设置为 true 强制使依赖预构建。
    // force: false,
    // 自定义代理规则
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path4) => path4.replace(/^\/api/, "")
      }
    }
  };
  return viteServer;
}

// build/vite/viteTestConfig.ts
var createVitestTest = () => {
  return {
    environment: "jsdom",
    transformMode: {
      web: [/.tsx$/]
    }
  };
};

// vite.config.ts
var __vite_injected_original_dirname2 = "D:\\TauriProjects\\stu-manager";
var vite_config_default = (configEnv) => {
  const { mode, command } = configEnv;
  const isBuild = command === "build";
  return {
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下请通过 --clearScreen false 设置。
    clearScreen: true,
    logLevel: "info",
    // esbuild
    esbuild: createViteEsbuild(isBuild),
    // vitest配置
    test: createVitestTest(),
    // 解析配置
    resolve: createViteResolve(mode, __vite_injected_original_dirname2),
    // 插件配置
    plugins: createVitePlugins(isBuild, configEnv),
    // 服务配置
    server: createViteServer(),
    // 打包配置
    build: createViteBuild(),
    // 依赖优化配置
    optimizeDeps: createViteOptimizeDeps(),
    // css预处理配置
    css: createViteCSS()
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS9idWlsZC50cyIsICJidWlsZC92aXRlL2Nzcy50cyIsICJidWlsZC92aXRlL2VzYnVpbGQudHMiLCAiYnVpbGQvdml0ZS9vcHRpbWl6ZURlcHMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vc3R5bGUudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vc3ZnLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL21vY2sudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vcHdhLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL3Zpc3VhbGl6ZXIudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW1hZ2VtaW4udHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaTE4bi50cyIsICJidWlsZC92aXRlL3BsdWdpbi9lbGVtZW50LnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL2J1aWxkT3V0ZUluZm8udHMiLCAiYnVpbGQvdml0ZS9yZXNvbHZlLnRzIiwgImJ1aWxkL3ZpdGUvc2VydmVyLnRzIiwgImJ1aWxkL3ZpdGUvdml0ZVRlc3RDb25maWcudHMiLCAidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxidWlsZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL2J1aWxkLnRzXCI7aW1wb3J0IHR5cGUgeyBCdWlsZE9wdGlvbnMgfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVCdWlsZCgpOiBCdWlsZE9wdGlvbnMge1xuICBjb25zdCB2aXRlQnVpbGQgPSB7XG4gICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICAvLyBcdTYzMDdcdTVCOUFcdThGOTNcdTUxRkFcdThERUZcdTVGODRcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBjc3NUYXJnZXQ6ICdjaHJvbWU4MCcsXG5cbiAgICAvLyBcdTYzMDdcdTVCOUFcdTc1MUZcdTYyMTBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2ODRcdTVCNThcdTY1M0VcdThERUZcdTVGODRcbiAgICBhc3NldHNEaXI6ICdzdGF0aWMnLFxuICAgIC8vIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjggQ1NTIFx1NEVFM1x1NzgwMVx1NjJDNlx1NTIwNlx1MzAwMlx1NUY1M1x1NTQyRlx1NzUyOFx1NjVGNlx1RkYwQ1x1NTcyOFx1NUYwMlx1NkI2NSBjaHVuayBcdTRFMkRcdTVCRkNcdTUxNjVcdTc2ODQgQ1NTIFx1NUMwNlx1NTE4NVx1ODA1NFx1NTIzMFx1NUYwMlx1NkI2NSBjaHVuayBcdTY3MkNcdThFQUJcdUZGMENcdTVFNzZcdTU3MjhcdTU3NTdcdTUyQTBcdThGN0RcdTY1RjZcdTYzRDJcdTUxNjUgXHU1OTgyXHU2NzlDXHU3OTgxXHU3NTI4XHVGRjBDXHU2NTc0XHU0RTJBXHU5ODc5XHU3NkVFXHU0RTJEXHU3Njg0XHU2MjQwXHU2NzA5IENTUyBcdTVDMDZcdTg4QUJcdTYzRDBcdTUzRDZcdTUyMzBcdTRFMDBcdTRFMkEgQ1NTIFx1NjU4N1x1NEVGNlx1NEUyRFx1MzAwMlxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICAvLyBcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTAgc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcdTMwMDJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIC8vIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjggYnJvdGxpIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1MzAwMlx1NTM4Qlx1N0YyOVx1NTkyN1x1NTc4Qlx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTNFRlx1ODBGRFx1NEYxQVx1NUY4OFx1NjE2Mlx1RkYwQ1x1NTZFMFx1NkI2NFx1Nzk4MVx1NzUyOFx1OEJFNVx1NTI5Rlx1ODBGRFx1NTNFRlx1ODBGRFx1NEYxQVx1NjNEMFx1OUFEOFx1NTkyN1x1NTc4Qlx1OTg3OVx1NzZFRVx1NzY4NFx1Njc4NFx1NUVGQVx1NjAyN1x1ODBGRFx1MzAwMlxuICAgIGJyb3RsaVNpemU6IGZhbHNlLFxuICAgIC8vIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgIC8vICAgY29tcHJlc3M6IHtcbiAgICAvLyAgICAgLy8gXHU2MjUzXHU1MzA1XHU2RTA1XHU5NjY0Y29uc29sZVxuICAgIC8vICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gICAgLy8gY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU3Njg0XHU5NjUwXHU1MjM2XHVGRjA4XHU0RUU1IGticyBcdTRFM0FcdTUzNTVcdTRGNERcdUZGMDlcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gIH07XG4gIHJldHVybiB2aXRlQnVpbGQ7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXGNzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL2Nzcy50c1wiO2ltcG9ydCB0eXBlIHsgQ1NTT3B0aW9ucyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZUNTUygpOiBDU1NPcHRpb25zIHtcbiAgY29uc3Qgdml0ZUNTUzogQ1NTT3B0aW9ucyA9IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAvLyBcdTkxNERcdTdGNkVzY3NzXHU1MTY4XHU1QzQwXHU2ODM3XHU1RjBGXHU0RUU1XHU1M0NBXHU1M0Q4XHU5MUNGXG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXG4gICAgICAgIGNoYXJzZXQ6IGZhbHNlLFxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxuICAgICAgICAgIEB1c2UgXCJAL3N0eWxlcy92YXIvZWxlbWVudC90aGVtZS9pbmRleC5zY3NzXCIgYXMgKjtcbiAgICAgICAgICBAdXNlIFwiQC9zdHlsZXMvdmFyL2luZGV4LnNjc3NcIiBhcyAqO1xuICAgICAgICBgLFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHZpdGVDU1M7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXGVzYnVpbGQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1RhdXJpUHJvamVjdHMvc3R1LW1hbmFnZXIvYnVpbGQvdml0ZS9lc2J1aWxkLnRzXCI7Ly8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy9zaGFyZWQtb3B0aW9ucy5odG1sI2VzYnVpbGRcblxuaW1wb3J0IHR5cGUgeyBFU0J1aWxkT3B0aW9ucyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZUVzYnVpbGQoaXNCdWlsZDogYm9vbGVhbik6IEVTQnVpbGRPcHRpb25zIHwgZmFsc2Uge1xuICByZXR1cm4ge1xuICAgIHB1cmU6IGlzQnVpbGQgPyBbJ2NvbnNvbGUnXSA6IFtdLFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxvcHRpbWl6ZURlcHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1RhdXJpUHJvamVjdHMvc3R1LW1hbmFnZXIvYnVpbGQvdml0ZS9vcHRpbWl6ZURlcHMudHNcIjtpbXBvcnQgdHlwZSB7IERlcE9wdGltaXphdGlvbk9wdGlvbnMgfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVPcHRpbWl6ZURlcHMoKTogRGVwT3B0aW1pemF0aW9uT3B0aW9ucyB7XG4gIGNvbnN0IHZpdGVPcHRpbWl6ZURlcHM6IERlcE9wdGltaXphdGlvbk9wdGlvbnMgPSB7XG4gICAgLy8gXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU0RTBEXHU1NzI4IG5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdUZGMENcdTk0RkVcdTYzQTVcdTc2ODRcdTUzMDVcdTRFMERcdTRGMUFcdTg4QUJcdTk4ODRcdTY3ODRcdTVFRkFcdTMwMDJcdTRGN0ZcdTc1MjhcdTZCNjRcdTkwMDlcdTk4NzlcdTUzRUZcdTVGM0FcdTUyMzZcdTk4ODRcdTY3ODRcdTVFRkFcdTk0RkVcdTYzQTVcdTc2ODRcdTUzMDVcdTMwMDJcbiAgICBpbmNsdWRlOiBbJ2VsZW1lbnQtcGx1cy9lcy9sb2NhbGUvbGFuZy96aC10dycsICdlbGVtZW50LXBsdXMvZXMvbG9jYWxlL2xhbmcvZW4nXSxcbiAgICAvLyBcdTlFRDhcdThCQTRcdTYwQzVcdTUxQjVcdTRFMEJcdUZGMENWaXRlIFx1NEYxQVx1NjI5M1x1NTNENlx1NEY2MFx1NzY4NCBpbmRleC5odG1sIFx1Njc2NVx1NjhDMFx1NkQ0Qlx1OTcwMFx1ODk4MVx1OTg4NFx1Njc4NFx1NUVGQVx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTg3OVx1MzAwMlx1NTk4Mlx1Njc5Q1x1NjMwN1x1NUI5QVx1NEU4NiBidWlsZC5yb2xsdXBPcHRpb25zLmlucHV0XHVGRjBDVml0ZSBcdTVDMDZcdThGNkNcdTgwMENcdTUzQkJcdTYyOTNcdTUzRDZcdThGRDlcdTRFOUJcdTUxNjVcdTUzRTNcdTcwQjlcdTMwMDJcbiAgICBlbnRyaWVzOiBbXSxcbiAgICAvLyBcdTU3MjhcdTk4ODRcdTY3ODRcdTVFRkFcdTRFMkRcdTVGM0FcdTUyMzZcdTYzOTJcdTk2NjRcdTc2ODRcdTRGOURcdThENTZcdTk4NzlcdTMwMDJcbiAgICBleGNsdWRlOiBbJ0B6b3VndC92aXRlLXBsdWdpbi10aGVtZS1wcmVwcm9jZXNzb3IvZGlzdC9icm93c2VyLXV0aWxzJ10sXG4gIH07XG4gIHJldHVybiB2aXRlT3B0aW1pemVEZXBzO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL2luZGV4LnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuXG4vLyBpbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSc7XG5cbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcblxuLy8gXHU2OEMwXHU2N0U1XHU2M0QyXHU0RUY2XHU3MkI2XHU2MDAxXG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0Jztcbi8vIFx1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFx1NjgzN1x1NUYwRlx1OTE0RFx1N0Y2RVxuaW1wb3J0IHsgY29uZmlnU3R5bGVQbHVnaW4gfSBmcm9tICcuL3N0eWxlJztcbi8vIHN2Z1x1OTE0RFx1N0Y2RVxuaW1wb3J0IHsgY29uZmlnU3ZnUGx1Z2luIH0gZnJvbSAnLi9zdmcnO1xuLy8gXHU1MzhCXHU3RjI5XG5pbXBvcnQgeyBjb25maWdDb21wcmVzc1BsdWdpbiB9IGZyb20gJy4vY29tcHJlc3MnO1xuLy8gbW9ja1xuaW1wb3J0IHsgY29uZmlnTW9ja1BsdWdpbiB9IGZyb20gJy4vbW9jayc7XG4vLyBwd2RcbmltcG9ydCB7IGNvbmZpZ1B3YVBsdWdpbiB9IGZyb20gJy4vcHdhJztcbi8vIFx1NjAyN1x1ODBGRFx1NTIwNlx1Njc5MFx1NURFNVx1NTE3N1xuaW1wb3J0IHsgY29uZmlnVmlzdWFsaXplclBsdWdpbiB9IGZyb20gJy4vdmlzdWFsaXplcic7XG4vLyBcdTU2RkVcdTcyNDdcdTUzOEJcdTdGMjlcbmltcG9ydCB7IGNvbmZpZ0ltYWdlbWluUGx1Z2luIH0gZnJvbSAnLi9pbWFnZW1pbic7XG4vLyB2dWUtaTE4blxuaW1wb3J0IHsgY29uZmlnVnVlSTE4blBsdWdpbiB9IGZyb20gJy4vaTE4bic7XG4vLyBlbGVtZW50XG5pbXBvcnQgeyBjb25maWdBdXRvRWxlbWVudFN0eWxlUGx1Z2luIH0gZnJvbSAnLi9lbGVtZW50JztcblxuLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU2M0QyXHU0RUY2IFx1OTVFRVx1NTAxOVx1OEJFRFx1RkYwQ1x1NjI1M1x1NTMwNVx1NjhDMFx1NkQ0Qlx1NzUyOFx1NjVGNlx1MzAwMVx1NTkyN1x1NUMwRlxuaW1wb3J0IHZpdGVCdWlsZE91dGVJbmZvIGZyb20gJy4vYnVpbGRPdXRlSW5mbyc7XG5cbi8vIGVzbGludFxuLy8gaW1wb3J0IHsgY29uZmlnRXNMaW50ZXJQbHVnaW4gfSBmcm9tICcuL2VzbGludGVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoX2lzQnVpbGQgPSBmYWxzZSwgX2NvbmZpZ0VudjogQ29uZmlnRW52KSB7XG4gIGNvbnN0IHZpdGVQbHVnaW5zOiBQbHVnaW5PcHRpb25bXSA9IFtcbiAgICAvLyB2dWUoe1xuICAgIC8vICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAvLyB9KSxcbiAgXTtcblxuICB2aXRlUGx1Z2lucy5wdXNoKFxuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLCAvLyBcdTU5ODJcdTY3OUNcdTk3MDBcdTg5ODFcbiAgKTtcblxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ1N0eWxlUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnU3ZnUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnQ29tcHJlc3NQbHVnaW4oJ2d6aXAnLCB0cnVlKSk7XG5cbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdNb2NrUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnUHdhUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnVmlzdWFsaXplclBsdWdpbigpKTtcblxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0ltYWdlbWluUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2godml0ZUJ1aWxkT3V0ZUluZm8oKSk7XG5cbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdWdWVJMThuUGx1Z2luKCkpO1xuXG4gIHZpdGVQbHVnaW5zLnB1c2goSW5zcGVjdCgpKTtcblxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0F1dG9FbGVtZW50U3R5bGVQbHVnaW4oKSk7XG5cbiAgLy8gXHU0RjdGXHU3NTI4XHU2QjY0XHU2M0QyXHU0RUY2XHU0RjFBXHU1QkZDXHU4MUY0dml0ZVx1NTQyRlx1NTJBOFx1NTNEOFx1NjE2MiAxMDBtc1x1NURFNlx1NTNGM1xuICAvLyB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0VzTGludGVyUGx1Z2luKGNvbmZpZ0VudikpXG5cbiAgcmV0dXJuIHZpdGVQbHVnaW5zO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXHN0eWxlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL3N0eWxlLnRzXCI7LyoqXG4gKiBcdTUyQThcdTYwMDFcdTVGMTVcdTUxNjVcdTdFQzRcdTRFRjZcdTVFOTNcdTY4MzdcdTVGMEZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0L2Jsb2IvbWFpbi9SRUFETUUuemhfQ04ubWRcbiAqL1xuLy8gaW1wb3J0IHN0eWxlSW1wb3J0IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCc7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnU3R5bGVQbHVnaW4oKTogUGx1Z2luIHwgUGx1Z2luW10ge1xuICAvLyBjb25zdCBvcHRpb25zID0ge1xuICAvLyAgIC8vIGxpYnM6IFtcbiAgLy8gICAvLyAgIHtcbiAgLy8gICAvLyAgICAgbGlicmFyeU5hbWU6ICdlbGVtZW50LXBsdXMnLFxuICAvLyAgIC8vICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgLy8gICAvLyAgICAgZW5zdXJlU3R5bGVGaWxlOiB0cnVlLFxuICAvLyAgIC8vICAgICByZXNvbHZlU3R5bGU6IChuYW1lOiBhbnkpID0+IHtcbiAgLy8gICAvLyAgICAgICBuYW1lID0gbmFtZS5zbGljZSgzKTtcbiAgLy8gICAvLyAgICAgICAvLyBcdTRGN0ZcdTc1MjhlbGVtZW50IHNjc3NcdTY4MzdcdTVGMEZcbiAgLy8gICAvLyAgICAgICByZXR1cm4gYGVsZW1lbnQtcGx1cy9wYWNrYWdlcy90aGVtZS1jaGFsay9zcmMvJHtuYW1lfS5zY3NzYDtcbiAgLy8gICAvLyAgICAgICAvLyBcdTRGN0ZcdTc1MjhlbGVtZW50IGNzc1x1NjgzN1x1NUYwRlxuICAvLyAgIC8vICAgICAgIC8vIHJldHVybiBgZWxlbWVudC1wbHVzL2xpYi90aGVtZS1jaGFsay8ke25hbWV9LmNzc2A7XG4gIC8vICAgLy8gICAgIH0sXG4gIC8vICAgLy8gICAgIC8vIHJlc29sdmVDb21wb25lbnQ6IChuYW1lOiBhbnkpID0+IHtcbiAgLy8gICAvLyAgICAgLy8gXHRjb25zb2xlLmxvZyhuYW1lKVxuICAvLyAgIC8vICAgICAvLyBcdHJldHVybiBgZWxlbWVudC1wbHVzL2xpYi8ke25hbWV9YFxuICAvLyAgIC8vICAgICAvLyB9LFxuICAvLyAgIC8vICAgfSxcbiAgLy8gICAvLyBdLFxuICAvLyB9O1xuICAvLyBjb25zdCBwbHVnaW46IFBsdWdpbltdID0gW3N0eWxlSW1wb3J0KG9wdGlvbnMpXTtcbiAgY29uc3QgcGx1Z2luOiBQbHVnaW5bXSA9IFtdO1xuICByZXR1cm4gcGx1Z2luO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXHN2Zy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL3BsdWdpbi9zdmcudHNcIjsvKipcbiAqIHN2Z1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1zdmctaWNvbnMvYmxvYi9tYWluL1JFQURNRS56aF9DTi5tZFxuICovXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnU3ZnUGx1Z2luKCkge1xuICBjb25zdCBzdmdQbHVnaW4gPSBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgLy8gXHU1MzhCXHU3RjI5XHU5MTREXHU3RjZFXG4gICAgLy8gc3Znb09wdGlvbnM6IGZhbHNlLFxuICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gIH0pO1xuICByZXR1cm4gc3ZnUGx1Z2luO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGNvbXByZXNzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzXCI7LyoqXG4gKiBcdTc1MjhcdTRFOEVcdTYyNTNcdTUzMDVcdTU0OENcdThGOTNcdTUxRkFnemlwXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uL2Jsb2IvbWFpbi9SRUFETUUuemhfQ04ubWRcbiAqL1xuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdDb21wcmVzc1BsdWdpbihjb21wcmVzczogJ2d6aXAnIHwgJ2Jyb3RsaScgfCAnbm9uZScsIGRpc2FibGUgPSBmYWxzZSk6IFBsdWdpbiB8IFBsdWdpbltdIHtcbiAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgaWYgKGNvbXByZXNzID09PSAnZ3ppcCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgZXh0OiAnLmd6JyxcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgIH07XG4gIH1cbiAgaWYgKGNvbXByZXNzID09PSAnYnJvdGxpJykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBleHQ6ICcuYnInLFxuICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBwbHVnaW46IFBsdWdpbltdID0gW1xuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgZGlzYWJsZSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSksXG4gIF07XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL21vY2sudHNcIjsvKipcbiAqIE1vY2sgcGx1Z2luIGZvciBkZXZlbG9wbWVudCBhbmQgcHJvZHVjdGlvbi5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tbW9ja1xuICovXG5pbXBvcnQgeyB2aXRlUGx1Z2luRmFrZVNlcnZlciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWZha2Utc2VydmVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ01vY2tQbHVnaW4oKSB7XG4gIHJldHVybiB2aXRlUGx1Z2luRmFrZVNlcnZlcih7XG4gICAgbG9nZ2VyOiBmYWxzZSxcbiAgICBpbmNsdWRlOiAnbW9jaycsXG4gICAgaW5maXhOYW1lOiBmYWxzZSxcbiAgICBlbmFibGVQcm9kOiB0cnVlLFxuICB9KTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxwd2EudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1RhdXJpUHJvamVjdHMvc3R1LW1hbmFnZXIvYnVpbGQvdml0ZS9wbHVnaW4vcHdhLnRzXCI7LyoqXG4gKiBwd2FcbiAqIGh0dHBzOi8vdml0ZS1wbHVnaW4tcHdhLm5ldGxpZnkuYXBwXG4gKi9cbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnUHdhUGx1Z2luKCkge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnLCAnZmF2aWNvbi5pY28nLCAncm9ib3RzLnR4dCcsICdhcHBsZS10b3VjaC1pY29uLnBuZyddLFxuICAgIGxvZ0xldmVsOiAnc2lsZW50JyxcbiAgICB3b3JrYm94OiB7XG4gICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogMzAwMDAwMCxcbiAgICB9LFxuICAgIG1hbmlmZXN0OiB7XG4gICAgICBuYW1lOiAnXHU1QzBGXHU2NUFGXHU3QkExXHU3NDA2XHU1NDBFXHU1M0YwXHU2QTIxXHU2NzdGJyxcbiAgICAgIHNob3J0X25hbWU6ICdcdTVDMEZcdTY1QUZcdTU0MEVcdTUzRjBcdTZBMjFcdTY3N0YnLFxuICAgICAgZGVzY3JpcHRpb246ICdcdTU3RkFcdTRFOEUgdnVlMyt2aXRlK2VsZW1lbnQtcHVzaCBcdTY0MkRcdTVFRkFcdTc2ODRcdTU0MEVcdTUzRjBcdTZBMjFcdTY3N0YnLFxuICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6ICcvcHdhL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyxcbiAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnL3B3YS9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogJy9wd2EvYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIFZpdGVQV0Eob3B0aW9ucyk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcdmlzdWFsaXplci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL3BsdWdpbi92aXN1YWxpemVyLnRzXCI7aW1wb3J0IHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vYnRkL3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnVmlzdWFsaXplclBsdWdpbigpOiBQbHVnaW4gfCBQbHVnaW5bXSB7XG4gIGlmIChwcm9jZXNzLmVudi5SRVBPUlQgPT09ICd0cnVlJykge1xuICAgIHJldHVybiBbXG4gICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgZmlsZW5hbWU6ICcuL25vZGVfbW9kdWxlcy8uY2FjaGUvdmlzdWFsaXplci9zdGF0cy5odG1sJyxcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICB9KSBhcyB1bmtub3duIGFzIFBsdWdpbixcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGltYWdlbWluLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL2ltYWdlbWluLnRzXCI7Ly8gXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5uY3diL3ZpdGUtcGx1Z2luLWltYWdlbWluXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0ltYWdlbWluUGx1Z2luKCkge1xuICByZXR1cm4gdml0ZUltYWdlbWluKHtcbiAgICB2ZXJib3NlOiBmYWxzZSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaW1hZ2VtaW4vaW1hZ2VtaW4tZ2lmc2ljbGVcbiAgICBnaWZzaWNsZToge1xuICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDMsXG4gICAgfSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaW1hZ2VtaW4vaW1hZ2VtaW4tb3B0aXBuZ1xuICAgIG9wdGlwbmc6IHtcbiAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ltYWdlbWluL2ltYWdlbWluLW1vempwZWdcbiAgICBtb3pqcGVnOiB7XG4gICAgICBxdWFsaXR5OiAzMCxcbiAgICB9LFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbWFnZW1pbi9pbWFnZW1pbi1wbmdxdWFudFxuICAgIHBuZ3F1YW50OiB7XG4gICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N2Zy9zdmdvLyN3aGF0LWl0LWNhbi1kb1xuICAgIHN2Z286IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9KTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxpMThuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL2kxOG4udHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnVnVlSTE4blBsdWdpbigpIHtcbiAgcmV0dXJuIFZ1ZUkxOG5QbHVnaW4oe1xuICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vJywgJy4vc3JjL2xvY2FsZXMvbW9kdWxlcy8qKicpXSxcbiAgfSk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcZWxlbWVudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL3BsdWdpbi9lbGVtZW50LnRzXCI7Ly8gXHU2MzA5XHU5NzAwZWxlbWVudFx1NjgzN1x1NUYwRlxuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0F1dG9FbGVtZW50U3R5bGVQbHVnaW4oKSB7XG4gIHJldHVybiBFbGVtZW50UGx1cyh7XG4gICAgdXNlU291cmNlOiB0cnVlLFxuICB9KTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxidWlsZE91dGVJbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9UYXVyaVByb2plY3RzL3N0dS1tYW5hZ2VyL2J1aWxkL3ZpdGUvcGx1Z2luL2J1aWxkT3V0ZUluZm8udHNcIjtpbXBvcnQgeyByZWFkZGlyLCBzdGF0IH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBkdXJhdGlvbiBmcm9tICdkYXlqcy9wbHVnaW4vZHVyYXRpb24nO1xuaW1wb3J0IHsgZ3JlZW4gfSBmcm9tICdrb2xvcmlzdCc7XG5pbXBvcnQgdHlwZSB7IERheWpzIH0gZnJvbSAnZGF5anMnO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4sIFJlc29sdmVkQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5kYXlqcy5leHRlbmQoZHVyYXRpb24pO1xuXG5jb25zdCB0b3N0ID0gYFx1RDgzRVx1REQyOVx1NEY2MFx1NTk3RFx1RkYwMVx1NTk4Mlx1Njc5Q1x1NjBBOFx1NjExRlx1ODlDOVx1NTE4NVx1NUJCOVx1OEZEOFx1NEUwRFx1OTUxOVx1RkYwQ1x1NTcyOFx1NTNGM1x1OEZCOVx1OTRGRVx1NjNBNVx1N0VEOVx1NEUyQXN0YXJcdTU0RTZcdUQ4M0RcdURFMThcdUZGMDFodHRwczovL2dpdGh1Yi5jb20vanN4aWFvc2kvdnVlLXhzLWFkbWluYDtcblxuZnVuY3Rpb24gZ2V0ZGlyc2l6ZShkaXI6IHN0cmluZywgY2FsbGJhY2s6IChmaWxlTnVtYmVyOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gdm9pZCkge1xuICBsZXQgc2l6ZSA9IDA7XG4gIGxldCBmaWxlTnVtYmVyID0gMDtcbiAgc3RhdChkaXIsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgdGhyb3cgZXJyOyAvL1x1NTk4Mlx1Njc5Q1x1NTFGQVx1OTUxOVxuICAgIGlmIChzdGF0cy5pc0ZpbGUoKSkgcmV0dXJuIGNhbGxiYWNrKDEsIHN0YXRzLnNpemUpOyAvL1x1NTk4Mlx1Njc5Q1x1NjYyRlx1NjU4N1x1NEVGNlxuXG4gICAgcmVhZGRpcihkaXIsIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAvL1x1NTk4Mlx1Njc5Q1x1NjYyRlx1NzZFRVx1NUY1NVxuICAgICAgaWYgKGVycikgdGhyb3cgZXJyOyAvL1x1NTk4Mlx1Njc5Q1x1OTA0RFx1NTM4Nlx1NzZFRVx1NUY1NVx1NTFGQVx1OTUxOVxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGNhbGxiYWNrKDAsIDApOyAvL1x1NTk4Mlx1Njc5Q1x1NzZFRVx1NUY1NVx1NjYyRlx1N0E3QVx1NzY4NFxuXG4gICAgICBsZXQgY291bnQgPSBmaWxlcy5sZW5ndGg7IC8vXHU2NTg3XHU0RUY2XHU2NTcwXHU5MUNGXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdldGRpcnNpemUoam9pbihkaXIsIGZpbGVzW2ldKSwgKF9maWxlTnVtYmVyOiBudW1iZXIsIF9zaXplOiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgICAgc2l6ZSArPSBfc2l6ZTtcbiAgICAgICAgICBmaWxlTnVtYmVyICs9IF9maWxlTnVtYmVyO1xuICAgICAgICAgIGlmICgtLWNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIC8vXHU1OTgyXHU2NzlDXHU3NkVFXHU1RjU1XHU0RTJEXHU2MjQwXHU2NzA5XHU2NTg3XHU0RUY2KFx1NjIxNlx1NzZFRVx1NUY1NSlcdTkwRkRcdTkwNERcdTUzODZcdTVCOENcdTYyMTBcbiAgICAgICAgICAgIGNhbGxiYWNrKGZpbGVOdW1iZXIsIHNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvU2l6ZShieXRlczogbnVtYmVyLCBmaXhlZCA9IDIpIHtcbiAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzAgQnl0ZXMnO1xuICBjb25zdCBrID0gMTAyNDtcbiAgY29uc3Qgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ107XG4gIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKGspKTtcbiAgcmV0dXJuIGAke3BhcnNlRmxvYXQoKGJ5dGVzIC8gayAqKiBpKS50b0ZpeGVkKGZpeGVkKSl9ICR7c2l6ZXNbaV19YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpdGVCdWlsZE91dGVJbmZvKCk6IFBsdWdpbiB7XG4gIGxldCBjb25maWc6IFJlc29sdmVkQ29uZmlnO1xuICBsZXQgc3RhcnRUaW1lOiBEYXlqcywgZW5kVGltZTogRGF5anM7XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBcdTYzRDJcdTRFRjZcdTU0MERcdTc5RjBcbiAgICBuYW1lOiAndml0ZS1idWlsZC1vdXRlLWluZm8nLFxuXG4gICAgLy8gXHU4QkU1XHU2M0QyXHU0RUY2XHU1NzI4IHBsdWdpbi12dWUgXHU2M0QyXHU0RUY2XHU0RTRCXHU1MjREXHU2MjY3XHU4ODRDXHVGRjBDXHU4RkQ5XHU2ODM3XHU1QzMxXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU4OUUzXHU2NzkwXHU1MjMwXHU1MzlGXHU2QTIxXHU2NzdGXHU2NTg3XHU0RUY2XG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6ICdwb3N0JyxcbiAgICAgIGhhbmRsZXI6ICgpID0+IHt9LFxuICAgIH0sXG5cbiAgICBjb25maWdSZXNvbHZlZChyZXNvbHZlZENvbmZpZykge1xuICAgICAgLy8gXHU1QjU4XHU1MEE4XHU2NzAwXHU3RUM4XHU4OUUzXHU2NzkwXHU3Njg0XHU5MTREXHU3RjZFXG4gICAgICBjb25maWcgPSByZXNvbHZlZENvbmZpZztcbiAgICB9LFxuXG4gICAgLy8gcm9sbHVwLnJvbGx1cFx1NTcyOFx1NkJDRlx1NkIyMVx1NUYwMFx1NTlDQlx1Njc4NFx1NUVGQVx1NjVGNlx1OEMwM1x1NzUyOFxuICAgIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBjb25zb2xlLmluZm8oWycnLCBncmVlbih0b3N0KSwgJyddLmpvaW4oJ1xcbicpKTtcbiAgICAgIGlmIChjb25maWcuY29tbWFuZCA9PT0gJ2J1aWxkJykge1xuICAgICAgICBzdGFydFRpbWUgPSBkYXlqcyhuZXcgRGF0ZSgpKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xvc2VCdW5kbGUoKSB7XG4gICAgICBpZiAoY29uZmlnLmNvbW1hbmQgPT09ICdidWlsZCcpIHtcbiAgICAgICAgZW5kVGltZSA9IGRheWpzKG5ldyBEYXRlKCkpO1xuICAgICAgICBnZXRkaXJzaXplKGNvbmZpZy5idWlsZC5vdXREaXIsIChmLCBzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgXFxuJHtncmVlbihcbiAgICAgICAgICAgICAgYFx1NjI1M1x1NTMwNVx1NUI4Q1x1NjIxMFx1RDgzQ1x1REY4OVx1RkYwOFx1NjI1M1x1NTMwNVx1NjU4N1x1NEVGNlx1NjU3MFx1OTFDRlx1RkYxQSR7Zn1cdUZGMENcdTc1MjhcdTY1RjZcdUZGMUEke2RheWpzXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKGVuZFRpbWUuZGlmZihzdGFydFRpbWUpKVxuICAgICAgICAgICAgICAgIC5mb3JtYXQoJ21tXHU1MjA2c3NcdTc5RDInKX1cdUZGMENcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTU5MjdcdTVDMEZcdUZGMUEke2J5dGVzVG9TaXplKHMpfVx1RkYwOWAsXG4gICAgICAgICAgICApfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdml0ZUJ1aWxkT3V0ZUluZm87XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHJlc29sdmUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1RhdXJpUHJvamVjdHMvc3R1LW1hbmFnZXIvYnVpbGQvdml0ZS9yZXNvbHZlLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdHlwZSB7IEFsaWFzT3B0aW9ucywgUmVzb2x2ZU9wdGlvbnMgfSBmcm9tICd2aXRlJztcblxudHlwZSBteVJlc29sdmVPcHRpb25zID0gUmVzb2x2ZU9wdGlvbnMgJiB7IGFsaWFzPzogQWxpYXNPcHRpb25zIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUmVzb2x2ZShfbW9kZTogc3RyaW5nLCBteURpcm5hbWU6IHN0cmluZyk6IG15UmVzb2x2ZU9wdGlvbnMge1xuICBjb25zdCB2aXRlUmVzb2x2ZTogbXlSZXNvbHZlT3B0aW9ucyA9IHtcbiAgICAvLyBcdTVGMTVcdTc1MjhcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcbiAgICBhbGlhczoge1xuICAgICAgLy8gXHU5MTREXHU3RjZFQFx1NTIyQlx1NTQwRFxuICAgICAgJ0AnOiBgJHtwYXRoLnJlc29sdmUobXlEaXJuYW1lLCAnc3JjJyl9YCxcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RSNcdTUyMkJcdTU0MERcbiAgICAgICcjJzogYCR7cGF0aC5yZXNvbHZlKG15RGlybmFtZSwgJ3R5cGVzJyl9YCxcbiAgICB9LFxuICAgIC8vIFx1NUJGQ1x1NTE2NVx1NjVGNlx1NjBGM1x1ODk4MVx1NzcwMVx1NzU2NVx1NzY4NFx1NjI2OVx1NUM1NVx1NTQwRFx1NTIxN1x1ODg2OFx1MzAwMlx1NkNFOFx1NjEwRlx1RkYwQ1x1NEUwRCBcdTVFRkFcdThCQUVcdTVGRkRcdTc1NjVcdTgxRUFcdTVCOUFcdTRFNDlcdTVCRkNcdTUxNjVcdTdDN0JcdTU3OEJcdTc2ODRcdTYyNjlcdTVDNTVcdTU0MERcdUZGMDhcdTRGOEJcdTU5ODJcdUZGMUEudnVlXHVGRjA5XHVGRjBDXHU1NkUwXHU0RTNBXHU1QjgzXHU0RjFBXHU1RTcyXHU2MjcwIElERSBcdTU0OENcdTdDN0JcdTU3OEJcdTY1MkZcdTYzMDFcdTMwMDJcbiAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nXSxcbiAgfTtcblxuICByZXR1cm4gdml0ZVJlc29sdmU7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVGF1cmlQcm9qZWN0c1xcXFxzdHUtbWFuYWdlclxcXFxidWlsZFxcXFx2aXRlXFxcXHNlcnZlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL3NlcnZlci50c1wiO2ltcG9ydCB0eXBlIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVNlcnZlcigpOiBTZXJ2ZXJPcHRpb25zIHtcbiAgY29uc3Qgdml0ZVNlcnZlcjogU2VydmVyT3B0aW9ucyA9IHtcbiAgICAvLyBcdTY3MERcdTUyQTFcdTU2NjhcdTRFM0JcdTY3M0FcdTU0MERcdUZGMENcdTU5ODJcdTY3OUNcdTUxNDFcdThCQjhcdTU5MTZcdTkwRThcdThCQkZcdTk1RUVcdUZGMENcdTUzRUZcdThCQkVcdTdGNkVcdTRFM0FcIjAuMC4wLjBcIlxuICAgIGhvc3Q6IHRydWUsXG4gICAgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHU3QUVGXHU1M0UzXHU1M0Y3XG4gICAgcG9ydDogNTE3MyxcbiAgICAvLyBcdTdBRUZcdTUzRTNcdTVERjJcdTg4QUJcdTUzNjBcdTc1MjhcdTY1RjZcdTY2MkZcdTU0MjZcdTVDMURcdThCRDVcdTRGN0ZcdTc1MjhcdTRFMEJcdTRFMDBcdTRFMkFcdTUzRUZcdTc1MjhcdTc2ODRcdTdBRUZcdTUzRTMgdHJ1ZVx1RkYxQVx1NzZGNFx1NjNBNVx1OTAwMFx1NTFGQVx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NUMxRFx1OEJENVx1NEUwQlx1NEUwMFx1NEUyQVx1NTNFRlx1NzUyOFx1N0FFRlx1NTNFMyBmYWxzZVx1RkYxQVx1NUMxRFx1OEJENVx1NEUwQlx1NEUwMFx1NEUyQVx1NTNFRlx1NzUyOFx1N0FFRlx1NTNFM1xuICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgIC8vIGJvb2xlYW4gfCBzdHJpbmcgXHU1NDJGXHU1MkE4XHU5ODc5XHU3NkVFXHU2NUY2XHU4MUVBXHU1MkE4XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU2MjUzXHU1RjAwXHU1RTk0XHU3NTI4XHU3QTBCXHU1RThGXHVGRjFCXHU1OTgyXHU2NzlDXHU0RTNBc3RyaW5nXHVGRjBDXHU2QkQ0XHU1OTgyXCIvaW5kZXguaHRtbFwiXHVGRjBDXHU0RjFBXHU2MjUzXHU1RjAwaHR0cDovL2xvY2FsaG9zdDo1MTczL2luZGV4Lmh0bWxcbiAgICAvLyBvcGVuOiB0cnVlLFxuICAgIC8vIGJvb2xlYW4gfCBDb3JzT3B0aW9ucyAgXHU0RTNBXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MTREXHU3RjZFIENPUlNcdTMwMDJcdTlFRDhcdThCQTRcdTU0MkZcdTc1MjhcdTVFNzZcdTUxNDFcdThCQjhcdTRFRkJcdTRGNTVcdTZFOTBcdUZGMENcdTRGMjBcdTkwMTJcdTRFMDBcdTRFMkEgXHU5MDA5XHU5ODc5XHU1QkY5XHU4QzYxIFx1Njc2NVx1OEMwM1x1NjU3NFx1ODg0Q1x1NEUzQVx1NjIxNlx1OEJCRVx1NEUzQSBmYWxzZSBcdTg4NjhcdTc5M0FcdTc5ODFcdTc1MjhcdTMwMDJcbiAgICAvLyBjb3JzOiB0cnVlLFxuICAgIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQSB0cnVlIFx1NUYzQVx1NTIzNlx1NEY3Rlx1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVx1MzAwMlxuICAgIC8vIGZvcmNlOiBmYWxzZSxcbiAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTRFRTNcdTc0MDZcdTg5QzRcdTUyMTlcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG4gIHJldHVybiB2aXRlU2VydmVyO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXVyaVByb2plY3RzXFxcXHN0dS1tYW5hZ2VyXFxcXGJ1aWxkXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcYnVpbGRcXFxcdml0ZVxcXFx2aXRlVGVzdENvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGF1cmlQcm9qZWN0cy9zdHUtbWFuYWdlci9idWlsZC92aXRlL3ZpdGVUZXN0Q29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVWaXRlc3RUZXN0ID0gKCk6IFVzZXJDb25maWdbJ3Rlc3QnXSA9PiB7XG4gIHJldHVybiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgdHJhbnNmb3JtTW9kZToge1xuICAgICAgd2ViOiBbLy50c3gkL10sXG4gICAgfSxcbiAgfTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhdXJpUHJvamVjdHNcXFxcc3R1LW1hbmFnZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1RhdXJpUHJvamVjdHMvc3R1LW1hbmFnZXIvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB0eXBlIHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5cbmltcG9ydCB7IGNyZWF0ZVZpdGVCdWlsZCB9IGZyb20gJy4vYnVpbGQvdml0ZS9idWlsZCc7XG5pbXBvcnQgeyBjcmVhdGVWaXRlQ1NTIH0gZnJvbSAnLi9idWlsZC92aXRlL2Nzcyc7XG5pbXBvcnQgeyBjcmVhdGVWaXRlRXNidWlsZCB9IGZyb20gJy4vYnVpbGQvdml0ZS9lc2J1aWxkJztcbmltcG9ydCB7IGNyZWF0ZVZpdGVPcHRpbWl6ZURlcHMgfSBmcm9tICcuL2J1aWxkL3ZpdGUvb3B0aW1pemVEZXBzJztcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC92aXRlL3BsdWdpbic7XG5pbXBvcnQgeyBjcmVhdGVWaXRlUmVzb2x2ZSB9IGZyb20gJy4vYnVpbGQvdml0ZS9yZXNvbHZlJztcbmltcG9ydCB7IGNyZWF0ZVZpdGVTZXJ2ZXIgfSBmcm9tICcuL2J1aWxkL3ZpdGUvc2VydmVyJztcbmltcG9ydCB7IGNyZWF0ZVZpdGVzdFRlc3QgfSBmcm9tICcuL2J1aWxkL3ZpdGUvdml0ZVRlc3RDb25maWcnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZ0VudjogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IHsgbW9kZSwgY29tbWFuZCB9ID0gY29uZmlnRW52O1xuICAvLyBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcblxuICAvLyBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xuXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnO1xuXG4gIHJldHVybiB7XG4gICAgLy8gXHU4QkJFXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1OTA3Rlx1NTE0RCBWaXRlIFx1NkUwNVx1NUM0Rlx1ODAwQ1x1OTUxOVx1OEZDN1x1NTcyOFx1N0VDOFx1N0FFRlx1NEUyRFx1NjI1M1x1NTM3MFx1NjdEMFx1NEU5Qlx1NTE3M1x1OTUyRVx1NEZFMVx1NjA2Rlx1MzAwMlx1NTQ3RFx1NEVFNFx1ODg0Q1x1NkEyMVx1NUYwRlx1NEUwQlx1OEJGN1x1OTAxQVx1OEZDNyAtLWNsZWFyU2NyZWVuIGZhbHNlIFx1OEJCRVx1N0Y2RVx1MzAwMlxuICAgIGNsZWFyU2NyZWVuOiB0cnVlLFxuICAgIGxvZ0xldmVsOiAnaW5mbycsXG4gICAgLy8gZXNidWlsZFxuICAgIGVzYnVpbGQ6IGNyZWF0ZVZpdGVFc2J1aWxkKGlzQnVpbGQpLFxuICAgIC8vIHZpdGVzdFx1OTE0RFx1N0Y2RVxuICAgIHRlc3Q6IGNyZWF0ZVZpdGVzdFRlc3QoKSxcbiAgICAvLyBcdTg5RTNcdTY3OTBcdTkxNERcdTdGNkVcbiAgICByZXNvbHZlOiBjcmVhdGVWaXRlUmVzb2x2ZShtb2RlLCBfX2Rpcm5hbWUpLFxuICAgIC8vIFx1NjNEMlx1NEVGNlx1OTE0RFx1N0Y2RVxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKGlzQnVpbGQsIGNvbmZpZ0VudiksXG4gICAgLy8gXHU2NzBEXHU1MkExXHU5MTREXHU3RjZFXG4gICAgc2VydmVyOiBjcmVhdGVWaXRlU2VydmVyKCksXG4gICAgLy8gXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXG4gICAgYnVpbGQ6IGNyZWF0ZVZpdGVCdWlsZCgpLFxuICAgIC8vIFx1NEY5RFx1OEQ1Nlx1NEYxOFx1NTMxNlx1OTE0RFx1N0Y2RVxuICAgIG9wdGltaXplRGVwczogY3JlYXRlVml0ZU9wdGltaXplRGVwcygpLFxuICAgIC8vIGNzc1x1OTg4NFx1NTkwNFx1NzQwNlx1OTE0RFx1N0Y2RVxuICAgIGNzczogY3JlYXRlVml0ZUNTUygpLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFTyxTQUFTLGtCQUFnQztBQUM5QyxRQUFNLFlBQVk7QUFBQSxJQUNoQixRQUFRO0FBQUE7QUFBQSxJQUVSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBR1gsV0FBVztBQUFBO0FBQUEsSUFFWCxjQUFjO0FBQUE7QUFBQSxJQUVkLFdBQVc7QUFBQTtBQUFBLElBRVgsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNaLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQ0EsU0FBTztBQUNUOzs7QUMxQk8sU0FBUyxnQkFBNEI7QUFDMUMsUUFBTSxVQUFzQjtBQUFBLElBQzFCLHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsTUFBTTtBQUFBLFFBQ0osS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJaEIsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FDZE8sU0FBUyxrQkFBa0IsU0FBMEM7QUFDMUUsU0FBTztBQUFBLElBQ0wsTUFBTSxVQUFVLENBQUMsU0FBUyxJQUFJLENBQUM7QUFBQSxFQUNqQztBQUNGOzs7QUNOTyxTQUFTLHlCQUFpRDtBQUMvRCxRQUFNLG1CQUEyQztBQUFBO0FBQUEsSUFFL0MsU0FBUyxDQUFDLHFDQUFxQyxnQ0FBZ0M7QUFBQTtBQUFBLElBRS9FLFNBQVMsQ0FBQztB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QUFNLGNBQWdDO0FBQUE7QUFBQSxJQUVwQyxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssR0FBR0MsTUFBSyxRQUFRLFdBQVcsS0FBSyxDQUFDO0FBQUE7QUFBQSxNQUV0QyxLQUFLLEdBQUdBLE1BQUssUUFBUSxXQUFXLE9BQU8sQ0FBQztBQUFBLElBQzFDO0FBQUE7QUFBQSxJQUVBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsT0FBTztBQUFBLEVBQzVEO0FBRUEsU0FBTztBQUNUOzs7QUNqQk8sU0FBUyxtQkFBa0M7QUFDaEQsUUFBTSxhQUE0QjtBQUFBO0FBQUEsSUFFaEMsTUFBTTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUE7QUFBQSxJQUVOLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUVosT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFBQyxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FDeEJPLElBQU0sbUJBQW1CLE1BQTBCO0FBQ3hELFNBQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLEtBQUssQ0FBQyxPQUFPO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjs7O0FDVEEsSUFBTUMsb0NBQW1DO0FBY3pDLElBQU8sc0JBQVEsQ0FBQyxjQUFxQztBQUNuRCxRQUFNLEVBQUUsTUFBTSxRQUFRLElBQUk7QUFLMUIsUUFBTSxVQUFVLFlBQVk7QUFFNUIsU0FBTztBQUFBO0FBQUEsSUFFTCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUE7QUFBQSxJQUVWLFNBQVMsa0JBQWtCLE9BQU87QUFBQTtBQUFBLElBRWxDLE1BQU0saUJBQWlCO0FBQUE7QUFBQSxJQUV2QixTQUFTLGtCQUFrQixNQUFNQyxpQ0FBUztBQUFBO0FBQUEsSUFFMUMsU0FBUyxrQkFBa0IsU0FBUyxTQUFTO0FBQUE7QUFBQSxJQUU3QyxRQUFRLGlCQUFpQjtBQUFBO0FBQUEsSUFFekIsT0FBTyxnQkFBZ0I7QUFBQTtBQUFBLElBRXZCLGNBQWMsdUJBQXVCO0FBQUE7QUFBQSxJQUVyQyxLQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJwcm9jZXNzIiwgInByb2Nlc3MiLCAicGF0aCIsICJwYXRoIiwgImVyciIsICJwYXRoIiwgInBhdGgiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSJdCn0K
