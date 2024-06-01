<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import { QuestionVO } from '../../../generated/models/QuestionVO'
import CodeEditor from '@/components/CodeEditor.vue'
import { Message } from '@arco-design/web-vue'

const props = defineProps({
  id: { type: String, required: true }
})

const id = Number(props.id) //转换为数字类型
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
const getCode = (code: string, language: string) => {
  params.value = { ...params.value, code, language }
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
      <a-col :span="12">
        <a-card>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" title="题目描述">
              <a-scrollbar style="height: 80vh; overflow: auto">
                <div class="title-description">
                  <p>{{ questionInfo }}</p>
                </div>
              </a-scrollbar>
            </a-tab-pane>
            <a-tab-pane key="2" title="评论" disabled>
              Content of Tab Panel 2
            </a-tab-pane>
            <a-tab-pane key="3" title="题解">
              <template #title>题解</template>
              Content of Tab Panel 3
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="12">
        <CodeEditor @onCodeChange="getCode" />
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
  height: 80vh;
  // overflow-y: auto;
}
</style>
