<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import dayjs from 'dayjs'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

interface Record {
  createTime: string
}

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
    dataIndex: 'tags'
  },
  {
    title: '答案',
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

// 加载数据
const data = ref([])
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost({})
  data.value = res.data.records
  // pagination.value = { pageSize: res.data.size }
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
  loading.value = true
  loadData()

  loading.value = false
})

const router = useRouter()

// 重新编辑题目
const editQuestion = (record: QuestionType) => {
  router.push(`/questions/add?id=${record.id}`)
}

// 删除一条问题
const delQuestion = async (record: QuestionType) => {
  const delParams = { id: record?.id }
  await QuestionControllerService.deleteQuestionUsingPost(delParams)
  Message.success('删除成功')
  loading.value = true
  loadData()
  loading.value = false
}
</script>

<template>
  <div id="manage-question">
    <a-table
      :columns="columns"
      :data="data"
      :pagination="{ pageSize: 10 }"
      :loading="loading"
    >
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
