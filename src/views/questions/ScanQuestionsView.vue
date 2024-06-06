<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { QuestionVO } from '../../../generated/models/QuestionVO'
import checkAccess from '@/access/checkAccess'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/index'
import Access_Enum from '@/access/accessEnum'

interface Record {
  createTime: string
}

type Params = {
  pageSize: number
  current: number
}
const params = ref({
  title: '',
  tags: [],
  pageSize: 5,
  current: 1
})

// 列名
const columns = [
  {
    title: '题号',
    dataIndex: 'id'
  },
  {
    title: '题目名称',
    dataIndex: 'title'
  },

  {
    title: '标签',
    // dataIndex: 'tags',
    slotName: 'tag',
    width: 150
  },

  {
    title: '通过率',
    dataIndex: 'acceptedRate',
    render: ({
      record: { acceptedNum, submitNum }
    }: {
      record: QuestionVO
    }) => {
      return submitNum
        ? `${((acceptedNum ?? 0) / submitNum) * 100}`
        : '0' + `%(${acceptedNum} / ${submitNum})`
    }
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: ({ record: { createTime } }: { record: Record }) => {
      return dayjs(createTime).format('YYYY-MM-DD')
    }
  },
  {
    title: '操作',
    slotName: 'operation'
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

// 加载数据
const data = ref([])
const loading = ref(false)
const loadData = async (params: Params) => {
  loading.value = true
  //用户获取数据
  const res = await QuestionControllerService.listMyQuestionVoByPageUsingPost(
    params
  )
  data.value = res.data.records
  pagination.value = {
    ...pagination.value,
    total: JSON.parse(res.data.total),
    pageSize: JSON.parse(res.data.size),
    current: JSON.parse(res.data.current)
  }
  loading.value = false
}

type QuestionType = {
  id: number
  title: string
  content: string
  tags: string
  answer: string
  submitNum: number
  acceptedNum: number
  judegeConfig: string
  judgeCase: string
  userId: number
  createTime: string
  isDelete: number
  favourNum: number
  thumbNum: number
  updateTime: string
}

// 加载中

onMounted(async () => {
  loadData(params.value)
})

watchEffect(() => {
  // params值发生变化时重新加载数据
  loadData(params.value)
})

const router = useRouter()

// 分页
const pageChange = (page: number) => {
  params.value = { ...params.value, current: page }
}

// 搜索题目
const handleSearch = () => {
  params.value = { ...params.value, current: 1 }
}

// 做题
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const doQuestion = (record: QuestionType) => {
  if (checkAccess(user.value, Access_Enum.USER)) {
    router.push(`/questions/solve/${record.id}`)
  } else {
    router.push(`/user/login`)
  }
}
</script>

<template>
  <div id="manage-question">
    <a-form :model="params" layout="inline">
      <a-form-item field="title" label="题名">
        <a-input v-model="params.title" placeholder="根据题目名称搜索" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="params.tags"
          placeholder="根据标签搜索"
          @press-enter="handleSearch"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </a-form-item>
      <!-- <a-form-item> </a-form-item> -->
    </a-form>
    <a-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      @page-change="pageChange"
    >
      <template #tag="{ record }">
        <!-- <a-space direction="vertical" size="small"> -->
        <a-tag
          v-for="(item, index) in record.tags"
          :key="index"
          color="blue"
          :style="{ margin: '3px 5px 0 0' }"
        >
          {{ item }}
        </a-tag>
        <!-- </a-space> -->
      </template>
      <template #operation="{ record }">
        <a-button type="primary" @click="doQuestion(record)"> 做题 </a-button>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#manage-question {
  min-width: 1280px;
  margin: 0 50px;
}
</style>
