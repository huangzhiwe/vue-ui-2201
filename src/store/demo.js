//导入pinia
import { defineStore } from 'pinia';
const loadCount = () => {
  let count = localStorage.getItem('count-info');
  return count ? parseInt(count) : 0;
};
const saveCount = (count) => {
  localStorage.setItem('count-info', count);
};

const store = defineStore('demo', {
  state: () => {
    return {
      count: loadCount(),
    };
  },
  actions: {
    increment() {
      this.count++;
      saveCount(this.count);
    },
  },
});

export default store;
