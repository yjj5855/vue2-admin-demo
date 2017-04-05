# vue2-demo

> A Vue.js project

## Build Setup

``` bash
# 安装node环境 V7.4.0或以上
下载地址 https://nodejs.org/en

# 全局安装淘宝镜像工具
npm install cnpm -g

# 通过淘宝镜像安装依赖
cnpm install

# 复制本地配置文件
cp src/env/env.test.js src/env/env.js

# 启动开发环境 serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 自定义样式

```
# 全局安装 element-theme
cnpm install element-theme -g

# 修改 element-variables.css 中的变量

# 编译css (会输出到theme目录下)
et
```

## 第三方文档

```
# vue 2.0
https://cn.vuejs.org/

# vue-router
https://router.vuejs.org/zh-cn/

# vuex
https://vuex.vuejs.org/zh-cn/intro.html

# element-ui
http://element.eleme.io/#/zh-CN/component/installation

# webpack 2.0
https://doc.webpack-china.org/guides/

# echarts 3.0
http://echarts.baidu.com/option.html#title

# d3.js 3.0 (组织架构图)
http://www.kancloud.cn/wizardforcel/d3-api-ref/101209

```

# 编译兼容element-ui的font-awesome
```
@fa-css-prefix:       el-icon-fa; //修改为兼容element的class名称


lessc ./static/font-awesome-4.7.0/less/font-awesome.less > ./static/el-font-awesome.css
```

# 问题

## 浏览器兼容
vue.js 只兼容 IE9和IE9+ 的浏览器，需要统计一下目前IE8用户的占比，如果很少的话可以放弃兼容

