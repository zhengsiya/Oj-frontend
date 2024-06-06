<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import dayjs from 'dayjs'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

interface Record {
  createTime: string
}

type Params = {
  pageSize: number
  current: number
}
const params = ref({
  pageSize: 5,
  current: 1
})

// 列名
const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '标签',
    // dataIndex: 'tags',
    slotName: 'tag',
    width: 150
  },
  {
    title: '题解',
    dataIndex: 'answer'
  },
  {
    title: '提交数',
    dataIndex: 'submitNum'
  },
  {
    title: '通过数',
    dataIndex: 'acceptedNum'
  },
  {
    title: '判题配置',
    dataIndex: 'judegeConfig'
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase'
  },
  {
    title: '用户id',
    dataIndex: 'userId'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: ({ record: { createTime } }: { record: Record }) => {
      return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
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
  current: 1
})

// 加载数据
const data = ref([])
const loadData = async (params: Params) => {
  loading.value = true
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    params
  )
  data.value = res.data.records
  pagination.value = {
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
const loading = ref(false)
onMounted(async () => {
  loadData(params.value)
})

watchEffect(() => {
  // params值发生变化时重新加载数据
  loadData(params.value)
})

const router = useRouter()

// 重新编辑题目
const editQuestion = (record: QuestionType) => {
  router.push(`/questions/add?id=${record.id}`)
}

// 删除一条问题
const delQuestion = async (record: QuestionType) => {
  const delParams = { id: record?.id }
  const res = await QuestionControllerService.deleteQuestionUsingPost(delParams)
  if (res.code === 0) {
    Message.success('删除成功')
  } else {
    Message.error('删除失败' + res.message)
  }

  // 刷新后应回到第一页
  params.value = { ...params.value, current: 1 }
}

// 分页
const pageChange = (page: number) => {
  params.value = { ...params.value, current: page }
}
</script>

<template>
  <div id="manage-question">
    <a-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      @page-change="pageChange"
    >
      <template #tag="{ record }">
        <div class="table-cell-wrap">
          <!-- <a-space direction="vertical" size="small"> -->
          <a-tag
            v-for="(item, index) in JSON.parse(record.tags)"
            :key="index"
            color="blue"
            :style="{ margin: '3px 5px 0 0' }"
          >
            {{ item }}
          </a-tag>
          <!-- </a-space> -->
        </div>
      </template>
      <template #operation="{ record }">
        <a-space>
          <a-button type="outline" @click="editQuestion(record)" shape="circle">
            <icon-edit />
          </a-button>
          <a-popconfirm content="确定删除这条题目？" @ok="delQuestion(record)">
            <a-button type="outline" status="danger" shape="circle">
              <icon-delete />
            </a-button>
          </a-popconfirm>
        </a-space>
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
