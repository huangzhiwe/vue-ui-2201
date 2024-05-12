//后端接口访问
import axios from 'axios';
import qs from 'qs';
const BASE_URL = 'https://api.huhuiyu.top/';
const TOKEN_KEY = BASE_URL + '_token';

//本地token信息处理对象
const LocalToken = {
  save: (data) => {
    if (data && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
  },

  load: () => {
    let token = localStorage.getItem(TOKEN_KEY);
    return token ? token : '';
  },
  remove: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

const Api = {
  get: (url, param, cb) => {
    Api.ajax(url, param, cb, 'get');
  },
  post: (url, param, cb) => {
    Api.ajax(url, param, cb, 'post');
  },
  put: (url, param, cb) => {
    Api.ajax(url, param, cb, 'put');
  },
  delete: (url, param, cb) => {
    Api.ajax(url, param, cb, 'delete');
  },

  ajax: (url, param, cb, method) => {
    //      如果是get请求，参数要通过地址栏查询字符串提交
    if (method == 'get') {
      url = url + '?' + qs.stringify(param, { allowDots: true });
      param = '';
    }
    //发起请求
    const promise = axios({
      url: BASE_URL + url,
      method: method,
      data: param,
      headers: {
        Authorization: LocalToken.load(),
      },
    });
    //处理结果
    promise
      .then((response) => {
        LocalToken.save(response.data);
        cb(response.data);
      })
      .catch((error) => {
        console.log(error);
        cb({ code: 520, message: '网站, 请稍后尝试', success: false });
      });
  },
};

export { Api as default, Api as Api, LocalToken as LocalToken };
