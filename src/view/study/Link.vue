<template>
  <div>
    {{ pid }}={{ cid }}
    <el-select v-model="pid" @change="queryCity">
      <el-option :value="-1" :label="'请选择省份'"></el-option>
      <el-option
        v-for="d in plist"
        :value="d.pid"
        :label="d.province"
      ></el-option>
    </el-select>

    <el-select v-model="cid">
      <el-option :value="-1" :label="'请选择城市'"></el-option>
      <el-option v-for="d in clist" :value="d.cid" :label="d.city"></el-option>
    </el-select>
    <!-- {{ plist }} -->
    <!-- {{ clist }} -->
  </div>
  <hr />
  <div>
    {{ dept.deptName }}-{{ emp.employeeName }}
    <el-select @change="queryEmployee" v-model="dept" value-key="deptId">
      <el-option v-for="d in dlist" :value="d" :label="d.deptName"></el-option>
    </el-select>
    <el-table :data="elist">
      <el-table-column prop="employeeId" label="员工编号"></el-table-column>
      <el-table-column prop="employeeName" label="员工姓名"></el-table-column>
      <el-table-column prop="phone" label="员工电话"></el-table-column>
      <el-table-column label="信息最后修改时间">
        <template #default="scope">
          {{ scope.row.lastupdate }}
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    {{ elist }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Api } from '../../script/Api';
import { ElMessage } from 'element-plus';

//#region  省份城市联动
const pid = ref(-1);
const plist = ref([]);

const queryProvince = () => {
  Api.get('/link/provinces', {}, (data) => {
    if (data.success) {
      plist.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  });
};
const cid = ref(-1);
const clist = ref([]);
const queryCity = () => {
  if (pid.value == -1) {
    clist.value = [];
    clist.value = -1;
    return;
  }
  cid.value = -1;
  Api.get(`/link/cities/${pid.value}`, {}, (data) => {
    if (data.success) {
      clist.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  });
};

queryProvince();
//#endregion

//#region 员工部门联动
const dept = ref([]);
const dlist = ref([]);
const emp = ref({});
const elist = ref([]);
//作业完成全部的联动，每一个联动呈现两种

const queryDept = () => {
  Api.get('/link/departments', {}, (data) => {
    if (data.success) {
      dlist.value = data.data;
      //默认选择第一项
      dept.value = dlist.value[0];
      queryEmployee();
      return;
    }
    ElMessage.error(data.message);
  });
};

const queryEmployee = () => {
  Api.get(`/link/employees/${dept.value.deptId}`, {}, (data) => {
    if (data.success) {
      elist.value = data.data;
      emp.value = elist.value[0];
      return;
    }
    ElMessage.error(data.message);
  });
};

queryDept();

//#endregion
</script>

<style scoped></style>
