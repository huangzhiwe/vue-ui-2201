<template>
  <!-- 上方的查询表单 -->
  <div> 
    {{ queryInfo }}
    <el-form :inline="true">
      
      <el-form-item>
        <el-select v-model="queryInfo.order">
          <el-option v-for="d in orderList":key="d.value" :value="d.value":label="d.label" width="100px">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryInfo.title" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryInfo.info" placeholder="请输入内容" />
      </el-form-item>


      <el-form-item>
        <el-date-picker
        v-model="queryInfo.startTime"
        type="date"
        format="YYYY-MM-DD"
        placeholder="开始时间"
      />

      </el-form-item>

      <el-form-item>
        <el-date-picker
        v-model="queryInfo.endTimeTime"
        type="date"
        format="YYYY-MM-DD"
        placeholder="结束时间"
      />

      </el-form-item>


      <el-form-item>
    <el-button-group>
      <el-button type="primary" @click="reset">重置</el-button>
    <el-button type="success"  @click="requery">查询</el-button>
    <el-button type="info"  @click="showAdd">添加</el-button>
    </el-button-group>
      </el-form-item>

</el-form>

  </div>

  <!-- 数据呈现的部分 -->
  <div v-loading="loading">
  <el-table :data="list">
    <el-table-column prop="nid" label="编号" width="100" />
    <el-table-column prop="title" label="标题"  />
    <el-table-column prop="source" label="来源" />
    <el-table-column prop="hits" label="点击量"  width="100"/>

    <el-table-column  label="信息最后修改时间">
      <template #default="scope">
        {{ Tools.formatDate(scope.row.lastupdate) }}
      </template>
    </el-table-column>
    <el-table-column  label="操作">
      <template #default="scope">
        <el-button type="success" size="'small'"@click="showModify(scope.row)">修改</el-button>
        <el-button  size="'small'" @click="queryDetail(scope.row)">查看内容</el-button>
        <el-button type="danger" size="'small'" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <div>
    <el-pagination background layout="prev, pager, nex,total,sizes"
      :page-sizes="[1, 5, 10, 20]"
    :total="page.total" 
    v-model:page-size="page.pageSize"
    v-model:current-page="page.pageNumber"
    @current-change="query"
    @size-change="query"
    />
  </div>
</div>
<!-- 查看内容的对话框 -->
<el-dialog :title="detail.title":fullscreen="true" v-model="dvisible">
    <div>
      <div v-html="detail.info">

      </div>


      
    </div>
  </el-dialog>





  <!--  添加的对话框 -->
  <el-dialog title="发布新闻" v-model="avisible" @closed="requery">
    <div>
      <el-form>
        <el-form-item label="新闻标题">
          <el-input v-model="addInfo.title" />
        </el-form-item>
        <el-form-item label="新闻来源">
          <el-input v-model="addInfo.source" />
        </el-form-item>
        <el-form-item label="新闻内容">
          <el-input v-model="addInfo.info"
          :row="10"
        type="textarea" />


        </el-form-item>

        </el-form>
    </div>
    <template #footer>
      <div>
        <el-button type="danger" @click="avisible = false">取消</el-button>
        <el-button type="info" @click="resetAdd">重填</el-button>
        <el-button type="success" @click="add">发布</el-button>
      </div>
    </template>

  </el-dialog>

<!-- 修改的对话框 -->
  <el-dialog title="修改新闻" v-model="mvisible" @closed="requery">
    <div>
      <el-form>
        <el-form-item label="新闻标题">
          <el-input v-model="modifyInfo.title" />
        </el-form-item>
        <el-form-item label="新闻来源">
          <el-input v-model="modifyInfo.source" />
        </el-form-item>
        <el-form-item label="新闻内容">
          <el-input v-model="modifyInfo.info"
          :row="10"
        type="textarea" />


        </el-form-item>

        </el-form>
    </div>
    <template #footer>
      <div>
        <el-button type="danger" @click="mvisible = false">取消</el-button>
        <el-button type="success" @click="modify">发布</el-button>
      </div>
    </template>

  </el-dialog>


</template>

<script setup>
import { ref } from 'vue';
import { Api } from '../script/Api';
import { Tools } from '../script/Tools';
import { ElMessage, ElMessageBox } from 'element-plus';
//#region 查询的部分
const loading = ref(false);


const page = ref({
  pageNumber: 1,
  pageSize: 5,
});

const queryInfo = ref({
  order:1,
  title: '',
  info: '',
  startTime: '',
  endTime: '',
});

const orderList = ref([
  { label: '按照发布时间逆序', value: 1 },
  { label: '按点击量逆序', value: 2 },
  { label: '按发布时间正序', value: 3 },
  { label: '按点击量正序', value: 4 },
]);

const list = ref([]);

const reset = () => {
  queryInfo.value = {
    order: 1,
    title: '',
    info: '',
    startTime: '',
    endTime: '',
  };
  requery();
};

const requery =()=>{
  page.value.pageNumber =1;
  query();
};

const query = () => {
  loading.value = true;
  Api.get(
    '/crud/news',
    Tools.concatJson(page.value, queryInfo.value),
    (data) => {
      loading.value = false;
      if (data.success) {
        list.value = data.data.data;
        page.value = data.data.pageBean;
      } else {
      ElMessage.error(data.message);
        //ElMessageBox.alert(data.message, '新闻');
      }
    }
  );
};
query();
//#endregion

//#region 添加的部分
const avisible = ref(false);
const addInfo=ref({
  title: '',
  source: '',
  info: '',
  });

const resetAdd =()=>{
  addInfo.value={
    title: '',
    source: '',
    info: '',
    
  };
}
const showAdd =()=>{
  resetAdd();
  avisible.value=true;
}
const add=()=>{
  Api.post('/crud/news',addInfo.value,(data)=>{
    if(data.success){
      ElMessage.success(data.message);


      ElMessageBox.alert('添加成功','新闻');
      requery();
    }else{
      ElMessageBox.alert(data.message,'新闻');
    }
  })
}


//#endregion

//#region 查看详情的部分
const dvisible = ref(false);
const detail = ref({});

const queryDetail=(info)=>{
  Api.get(`/crud/news/${info.nid}`,{},(data)=>{
    if(data.success){
      detail.value=data.data;
      dvisible.value=true;
    }else{
      ElMessageBox.alert(data.message,'新闻');
    }
  });
};





//#endregion

//#region 修改的部分
const mvisible = ref(false);
const modifyInfo=ref({});

const showModify =(info)=>{
  Api.get(`/crud/news/${info.nid}`,{},(data)=>{
    if(data.success){
      modifyInfo.value=data.data;
      mvisible.value=true;
    }else{
      ElMessageBox.alert(data.message,'新闻');
    }
  });
}
const modify =()=>{
  Api.put('/crud/news',modifyInfo.value,(data)=>{
      ElMessageBox.alert(data.message,'新闻');
  });
};


//#endregion
//#region 删除的部分

const del =(info)=>{
  ElMessageBox.confirm(`是否删除:${info.title}`, '删除信息',)
  .then(()=>{
    console.log('点击了确定');
    Api.delete(`/crud/news/${info.nid}`,{},(data)=>{
      if(data.success){
        ElMessage.success(data.message);
      }else{
        ElMessage.error(data.message);
      }
      requery();
    });
  })
  .catch(()=>{
    console.log('点击了取消');
  });
};




//#endregion

</script>

<style scoped></style>
