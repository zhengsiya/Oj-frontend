<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import { QuestionVO } from '../../../generated/models/QuestionVO'
import CodeEditor from '@/components/CodeEditor.vue'
import { Message } from '@arco-design/web-vue'
import MDViewer from '@/components/MDViewer.vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/index'
import { storeToRefs } from 'pinia'

// 返回
const goBack = () => {
  window.history.back()
}
interface Record {
  updateTime: string
}

const loading = ref(false)

const props = defineProps({
  id: { type: String, required: true }
})

const id = Number(props.id)
const params = ref({
  code: '',
  language: 'java',
  questionId: id
}) //代码编辑器中的内容

const questionInfo = ref<QuestionVO | undefined>({})

const getQuestionInfo = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id)
  questionInfo.value = res.data
}

// 获取提交记录

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const recordParams = ref({
  userId: user.value.id
})
const record = ref([])
const getRecord = async () => {
  loading.value = true
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    recordParams.value
  )
  record.value = res.data.records
  loading.value = false
}

onMounted(() => {
  getQuestionInfo()
  getRecord()
})

// 获取代码编辑器中的内容
const getCode = (code: string) => {
  params.value = { ...params.value, code }
}

// 提交代码
const codeSubmit = async () => {
  const res = await QuestionControllerService.doQuestionSubmitUsingPost(
    params.value
  )
  if (res.code === 0) {
    Message.success('提交成功')
  } else {
    Message.error('提交失败,' + res.message)
  }
}

// 该题的提交记录
// 列名
const columns = [
  {
    title: '判题状态',
    slotName: 'status'
  },

  {
    title: '编程语言',
    dataIndex: 'language'
  },

  {
    title: '执行用时',
    slotName: 'time'
  },
  {
    title: '内存消耗',
    slotName: 'memory'
  },

  {
    title: '提交时间',
    dataIndex: 'updateTime',
    render: ({ record }: { record: Record }) => {
      return dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '备注',
    slotName: 'message'
  }
]

const pagination = ref({
  total: 0,
  pageSize: 10
})
// 点击提交记录选项卡时重新加载提交记录
const reloadRecords = (key: string) => {
  if (key === '3') {
    getRecord()
    pagination.value = {
      ...pagination.value,
      total: record.value.length
    }
  }
}
</script>

<template>
  <div id="do-question">
    <a-link @click="goBack" style="margin: 10px 0">
      <icon-left size="25" />
    </a-link>
    <a-row class="grid-demo" :gutter="24">
      <a-col :xs="24" :md="12">
        <a-tabs default-active-key="1" @tab-click="reloadRecords">
          <a-tab-pane key="1" title="题目描述">
            <a-card :title="questionInfo?.title">
              <template #extra>
                <a-space>
                  <a-tag
                    v-for="(item, index) in questionInfo?.tags"
                    :key="index"
                    color="blue"
                  >
                    {{ item }}
                  </a-tag>
                </a-space>
              </template>
              <a-scrollbar style="height: 74vh; overflow: auto">
                <div class="title-description">
                  <a-descriptions layout="inline-horizontal">
                    <a-descriptions-item label="内存限制">
                      {{ questionInfo?.judgeConfig?.memoryLimit }}
                    </a-descriptions-item>
                    <a-descriptions-item label="时间限制">
                      {{ questionInfo?.judgeConfig?.timeLimit }}
                    </a-descriptions-item>
                    <a-descriptions-item label="堆栈限制">
                      {{ questionInfo?.judgeConfig?.stackLimit }}
                    </a-descriptions-item>
                  </a-descriptions>
                  <!-- <a-divider /> -->
                  <MDViewer :value="questionInfo?.content" />
                </div>
              </a-scrollbar>
            </a-card>
          </a-tab-pane>

          <a-tab-pane key="2" title="题解">
            <template #title>题解</template>
            暂不支持查看题解
          </a-tab-pane>

          <a-tab-pane key="3" title="提交记录">
            <a-table
              :columns="columns"
              :data="record"
              :loading="loading"
              :pagination="pagination"
            >
              <template #status="{ record }">
                <a-tag v-if="record.status === 0" color="blue">判题中</a-tag>
                <a-tag v-else-if="record.status === 1" color="blue"
                  >判题完成</a-tag
                >
                <a-tag v-else-if="record.status === 2" color="blue"
                  >等待中</a-tag
                >
              </template>
              <template #time="{ record }">
                {{ record.judgeInfo.time ?? 'none' }}
              </template>
              <template #memory="{ record }">
                {{ record.judgeInfo.memory ?? 'none' }}
              </template>
              <template #message="{ record }">
                {{ record.judgeInfo.message ?? '' }}
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-select
          v-model="params.language"
          :style="{ width: '120px' }"
          default-value="java"
        >
          <a-option value="java">java</a-option>
          <a-option value="cpp">cpp</a-option>
          <a-option value="go">go</a-option>
        </a-select>
        <CodeEditor @onCodeChange="getCode" :language="params.language" />
        <a-button
          type="primary"
          :style="{ width: '120px', marginTop: '20px' }"
          @click="codeSubmit"
        >
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
#do-question {
  max-width: 1400px;
  margin: 0 auto;
}

.title-description {
  height: 74vh;
  // overflow-y: auto;
}
</style>
