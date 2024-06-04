<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import { QuestionVO } from '../../../generated/models/QuestionVO'
import CodeEditor from '@/components/CodeEditor.vue'
import { Message } from '@arco-design/web-vue'
import MDViewer from '@/components/MDViewer.vue'

const props = defineProps({
  id: { type: String, required: true }
})

const id = BigInt(props.id) //转换为bigint类型
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

onMounted(() => {
  getQuestionInfo()
})
// 返回
const goBack = () => {
  window.history.back()
}

// 获取代码编辑器中的内容
const getCode = (code: string) => {
  params.value = { ...params.value, code }
}

// 提交代码
const codeSubmit = async () => {
  console.log(params.value)
  const res = await QuestionControllerService.doQuestionSubmitUsingPost(
    params.value
  )
  if (res.code === 0) {
    Message.success('提交成功')
  } else {
    Message.error('提交失败,' + res.message)
  }
}
</script>

<template>
  <div id="do-question">
    <a-link @click="goBack" style="margin: 10px 0">
      <icon-left-circle size="25" />
    </a-link>
    <a-row class="grid-demo" :gutter="24">
      <a-col :xs="24" :md="12">
        <a-tabs default-active-key="1">
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
              <a-scrollbar style="height: 75vh; overflow: auto">
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
          <a-tab-pane key="2" title="评论" disabled>
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="3" title="题解">
            <template #title>题解</template>
            Content of Tab Panel 3
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
  height: 75vh;
  // overflow-y: auto;
}
</style>
