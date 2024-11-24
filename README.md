# 这是一个 Tarui2.0 + Vite + Vue3 的学生管理系统

## 特性

- **最新技术栈**：使用 Vue3/Vite3 等前端前沿技术开发
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **常用组件**：内置完善的常用组件封装
- **Tauri**：Tauri 编译桌面应用
- **PWA**：内置 PWA

## 准备

- [Node](https://nodejs.org/zh-cn/) 和 [Git](https://git-scm.com/) -项目开发环境
- [Vite](https://cn.vitejs.dev/) - 熟悉 Vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](https://es6.ruanyifeng.com/) - 熟悉 Es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/zh/) - 熟悉 Vue-Router 基本使用
- [Element-Plus](https://element-plus.gitee.io/#/zh-CN/) - Ui 基本使用

## 安装使用

### 1. 准备

首先您必需要安装 Rust 及其他系统依赖。 [安装 Rust](https://tauri.app/zh/v1/guides/getting-started/prerequisites)

### 2. 获取项目代码（Https or SSH）

```bash
git clone https://github.com/jsxiaosi/tauri-xs-admin.git

git clone git@github.com:jsxiaosi/tauri-xs-admin.git
```

### 3. 安装依赖

```bash
cd vite-vue3-Template
```

推荐使用`pnpm`

```bash
pnpm i
```

`npm`安装

```bash
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npm.taobao.org

```

### 4. 运行

```bash
npm run tauri dev
```

### 5. 打包应用

```bash
npm run tauri build
```


## 相关GitHub仓库：
[XsAdmin](https://github.com/jsxiaosi/tauri-xs-admin)
