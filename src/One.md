# 一阶段总结

- `view`目录是页面文件
- 每一次新增页面都要修改`router`里面配置
- 让每一个页面都有要给独立访问路径
- vue的基础知识
- vue文件默认是分为三块
- `template`里面是html页面代码
- `script`里面是js代码  
- `style`里面是css样式代码
- js里面的变量可以通过下面的几个方式和页面关联
- {{变量名称}}
- 元素的v-html="变量名称"
- 元素：属性名="变量名称"
- 双向绑定用v-model="变量名称"，只能用于表单元素
- v-for指令是循环生成元素，值的格式 变量名 in 数组名
- 事件是通过@事件名="方法名/代码"来绑定
