//导入pinia
import { defineStore } from 'pinia';
import {Api}from'../script/Api'
const ipinfo_key ='ipinfo_key';

const save =(info,ipinfo,weather)=>{
  let sinfo={
    info:info,
    ipinfo:ipinfo,
    weather:weather,
  };
  localStorage.setItem(ipinfo_key,JSON.stringify(sinfo));
};

const load =()=>{
  let info=localStorage.getItem(ipinfo_key);
  if(info){
    return JSON.parse(info);
  }
    return {
      //是否拿取到了信息
      info:false,
      //ip地址信息
      ipinfo:{},
      //天气信息
      weather:{},
  }
};

const store = defineStore('ipinfo', {
  state: () => {
    return {
      //是否拿取到了信息
      info:load().info,
      //ip地址信息
      ipinfo:load().ipinfo,
      //天气信息
      weather:load().weather,
    };
  },
  actions: {
    queryIpInfo(){
      let instance=this;
      //获取ip地址信息
      Api.get('/tools/ipinfo',{},(data)=>{
        if(!data.success) {
          return;
        }
        let ipinfo=data.data;
        //通过IP信息获取天气信息
        Api.get('/tools/weather/live',
        {
          city:ipinfo.citycode,
        },
          (wdata)=>{
            if(!wdata.success) {
              return;
            }
            save(true,ipinfo,wdata.data);
          }
        );
      });
    },
  },
});

export default store;
