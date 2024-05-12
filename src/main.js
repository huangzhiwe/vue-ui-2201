import { createApp } from 'vue';
//路由配置导入
import {router } from './router/index.js';
//pinia状态管理导入
import { createPinia } from 'pinia';
//饿了么ui导入
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue';
const app = createApp(App);
//使用路由
app.use(router);
//使用饿了么ui
app.use(ElementPlus, {
  locale: zhCn,
});
//使用pinia状态管理
app.use(createPinia());
app.mount('#app');
