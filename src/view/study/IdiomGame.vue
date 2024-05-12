<template>
  <div> 成语小游戏 </div>
  <div>
    <div>
      我的游玩次数:
      {{ myinfo }},最高{{ myinfo.score }}分。
      排行榜，游玩次数：{{ myinfo.idiomRank?.times }},高分榜:{{ myinfo.idiomRank?.score }}
    </div>
    <!-- {{ idiom_data }} -->
    <hr />

    <div v-if="idiom_data.idiom">
      <div>第{{ idiom_data.level }}关</div>
      <div>
        <span>{{ idiom_data.idiom.substring(0, idiom_data.index) }}</span>
        <span>_</span>
        <span>{{ idiom_data.idiom.substring(idiom_data.index) }}</span>
      </div>
      <hr />
      {{ idiom_data.results.split('') }}
      <div>
        <el-button @click="idiom_answer(d)" type="primary" v-for="d in idiom_data.results.split('')">
          {{ d }}
        </el-button>
      </div>
      <hr />
      {{ idiom }} 
    </div>

    <el-button  type="primary" @click="get_idiom">获取成语</el-button>
  </div>
  <hr>
  <div v-for="d in slist" >
    {{ d.user.tbUser.username}}的记录--  
    最高纪录:{{ d.score }},游玩次数:{{ d.time }}
  </div>
  <hr/>
  <div v-for="d in alist" >
    {{ d.user.tbUser.username}}的记录--  
    最高纪录:{{ d.score }},游玩次数:{{ d.time }}
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Api } from '../../script/Api';
import { ElMessage } from 'element-plus';
const idiom_data = ref({});
const idiom=ref({});
const myinfo=ref({});
const get_idiom = () => {
  idiom.value={};
  Api.get('/games/idiom', {}, (data) => {
    if (data.success) {
      idiom_data.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  });
};

const idiom_answer=(answer)=>{
  Api.post('/games/idiom',{answer:answer},(data)=>{
    idiom.value=data.data;
    if(data.success){
      ElMessage.success(data.message);
    }else{
      ElMessage.error(data.message);
    }
  });
};
const slist=ref([]);
const alist=ref([]);
const query=()=>{
  Api.get('/games/idiom/1/10/2',{},(data)=>{
    slist.value=data.data.data;
    
  });
  Api.get('/games/idiom/1/10/1',{},(data)=>{
    alist.value=data.data.data;
  });
  Api.get('/games/idiom/my',{},(data)=>{
    
    myinfo.value=data.data;
  });
};

query()

</script>
<style scoped></style>
