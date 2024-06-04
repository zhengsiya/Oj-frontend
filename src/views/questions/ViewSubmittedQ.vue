<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { QuestionSubmitQueryRequest } from '../../../generated/models/QuestionSubmitQueryRequest'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import dayjs from 'dayjs'

interface Record {
  updateTime: string
}

const loading = ref(false)

// 列名
const columns = [
  {
    title: '提交号',
    dataIndex: 'id'
  },
  {
    title: '编程语言',
    dataIndex: 'language'
  },

  {
    title: '判题信息',
    slotName: 'judgeInfo'
  },
  {
    title: '判题状态',
    slotName: 'status'
  },
  {
    title: '题目id',
    dataIndex: 'questionId'
  },
  {
    title: '提交者id',
    dataIndex: 'userId'
  },
  {
    title: '提交时间',
    dataIndex: 'updateTime',
    render: ({ record }: { record: Record }) => {
      return dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
]

// 分页设置
const pagination = ref({
  total: 0,
  pageSize: 5,
  current: 1,
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [2, 3, 5, 10],
  onPageSizeChange: (pageSize: number) => {
    params.value = { ...params.value, pageSize: pageSize, current: 1 }
  }
})

const params = ref<QuestionSubmitQueryRequest>({
  current: 1,
  pageSize: 10
})

const data = ref([])
const loadData = async () => {
  loading.value = true
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    params.value
  )
  data.value = res.data.records
  pagination.value = {
    ...pagination.value,
    total: Number(res.data.total),
    pageSize: Number(res.data.size),
    current: Number(res.data.current)
  }
  loading.value = false
}

onMounted(() => {
  loadData()
})

watchEffect(() => {
  // params值发生变化时重新加载数据
  loadData()
})

const pageChange = (current: number) => {
  params.value = { ...params.value, current }
}
</script>

<template>
  <div id="view-submitted">
    <a-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="pagination"
      @page-change="pageChange"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status === 0" color="blue">判题中</a-tag>
        <a-tag v-else-if="record.status === 1" color="blue">判题完成</a-tag>
        <a-tag v-else-if="record.status === 2" color="blue">等待中</a-tag>
      </template>
    </a-table>
  </div>
</template>
<!--
      
     
      
      
      -->
