# vue2-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 编译兼容element的font-awesome
```
@fa-css-prefix:       el-icon-fa; //修改为兼容element的class名称


lessc ./static/font-awesome-4.7.0/less/font-awesome.less > ./static/el-font-awesome.css
```

# 问题

## 浏览器兼容
vue.js 只兼容 IE9和IE9+ 的浏览器，需要统计一下目前IE8用户的占比，如果很少的话可以放弃兼容

