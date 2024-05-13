import {defineStore} from 'pinia';
import {Api} from "../script/Api";

const empty = {
  tbUser:{},
  tbUserInfo:{},
  tbRole:{},
  exInfo:{},


};


const store =defineStore('user',{
  state() {
    return{
      isLogin:false,
      user:empty,
    };
  },
  actions:{
    update(cb) {
      let instance = this;
      Api.get('/auth',{},(data)=>{
        if(data.success){
          instance.isLogin = true;
          instance.user = data.data;
        }else{
          instance.isLogin = false;
          instance.user = empty;
        }
        
        cb?.(data.success);

      });
    },
  },
});

export default store;