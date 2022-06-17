<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList()">
        {{ $t('table.search') }}
      </el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.lables}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryForm.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <div>users</div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUser } from '@/apis/users'
import { options } from './options'

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})

const total = ref(0)

const tableData = ref([])

const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  console.log(res)
  total.value = res.total
  tableData.value = res.users
}

initGetUsersList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsersList()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsersList()
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-input_suffix {
  align-items: center;
}
</style>
