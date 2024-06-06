<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MDEditor from '@/components/MDEditor.vue'
import { Message } from '@arco-design/web-vue'
import { QuestionControllerService } from '../../../generated/services/QuestionControllerService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const questionId: number | null = route?.query?.id as unknown as number

const form = ref({
  answer: '',
  content: '',
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  tags: [],
  title: ''
})

onMounted(async () => {
  if (questionId) {
    const res = await QuestionControllerService.getQuestionByIdUsingGet(
      questionId
    )
    form.value = res.data
    form.value.tags = JSON.parse(res.data?.tags)
    form.value.judgeCase = JSON.parse(res.data?.judgeCase ?? '')
    form.value.judgeConfig = JSON.parse(res.data?.judgeConfig ?? '')
  }
})

const formRef = ref()

// 表单校验
const rules = {
  title: [{ required: true, message: '标题不能为空' }],
  tags: [{ required: true, message: '标签不能为空' }],
  content: [{ required: true, message: '题目描述不能为空' }],
  answer: [{ required: true, message: '答案不能为空' }],
  judgeCase: [{ required: true, message: '判题用例不能为空' }]
}

const handletitleChange = (v: string) => {
  form.value.content = v
}
const handleAnsChange = (v: string) => {
  form.value.answer = v
}

// 添加判题用例
const addJudgeCase = () => {
  form.value.judgeCase.push({
    input: '',
    output: ''
  })
}

//删除测试用例
const delJudgeCase = (index: number) => {
  form.value.judgeCase.splice(index, 1)
}

// 提交题目

const handleSubmit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      //通过验证
      if (questionId) {
        await QuestionControllerService.updateQuestionUsingPost(form.value)
      } else {
        await QuestionControllerService.addQuestionUsingPost(form.value)
      }
      Message.success(`题目${questionId ? '更新' : '添加'}成功`)
      router.go(-1)
      formRef.value.resetFields() //清空表单内容
    } else {
      // 未通过验证
      Message.error('请检查表单是否填写完整')
    }
  })
}
</script>

<template>
  <div id="add-question">
    <h2>{{ questionId ? '更新题目' : '创建题目' }}</h2>
    <a-form
      :model="form"
      :rules="rules"
      ref="formRef"
      :style="{ width: '1000px', marginTop: '20px' }"
    >
      <a-form-item
        field="title"
        label="标题"
        validate-triiger="blur"
        prop="title"
      >
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        field="tags"
        label="标签"
        validate-triiger="blur"
        prop="tags"
      >
        <a-input-tag
          v-model="form.tags"
          placeholder="请输入题目所属标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="content"
        label="题目描述"
        validate-triiger="blur"
        prop="content"
      >
        <MDEditor
          :value="form.content"
          @onMDChange="handletitleChange"
          :style="{ minWidth: '600px', width: '800px' }"
        />
      </a-form-item>
      <a-form-item
        field="answer"
        label="题解"
        validate-triiger="blur"
        prop="answer"
      >
        <MDEditor
          :value="form.answer"
          @onMDChange="handleAnsChange"
          :style="{ minWidth: '600px', width: '800px' }"
        />
      </a-form-item>
      <a-form-item
        field="judgeConfig"
        label="判题配置"
        validate-triiger="blur"
        prop="judgeConfig"
      >
        <a-space direction="vertical" fill>
          <a-form-item
            field="judgeConfig.timeLimit"
            label="时间限制"
            validate-triiger="blur"
          >
            <a-input-number
              :style="{ width: '300px' }"
              placeholder="请输入数值"
              :default-value="1000"
              :min="0"
              mode="button"
              v-model="form.judgeConfig.timeLimit"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.memoryLimit"
            label="内存限制"
            validate-triiger="blur"
          >
            <a-input-number
              placeholder="请输入数值"
              :default-value="1000"
              :min="0"
              mode="button"
              v-model="form.judgeConfig.memoryLimit"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.stackLimit"
            label="堆栈限制"
            validate-triiger="blur"
          >
            <a-input-number
              placeholder="请输入数值"
              :default-value="1000"
              :min="0"
              mode="button"
              v-model="form.judgeConfig.stackLimit"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item field="judgeCase" label="判题用例" prop="judgeCase">
        <a-space direction="vertical" fill>
          <template v-for="(item, index) in form.judgeCase" :key="index">
            <a-row :gutter="16">
              <a-col :span="4">
                <a-button
                  type="text"
                  @click="delJudgeCase(index)"
                  status="danger"
                >
                  删除
                </a-button>
              </a-col>
              <a-col :span="20">
                <a-form-item
                  :field="'judgeCase[' + index + '].input'"
                  label="输入"
                  :rules="[{ required: true, message: '输入不能为空' }]"
                >
                  <a-input v-model="item.input" :style="{ width: '300px' }" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="20" :offset="4">
                <a-form-item
                  :field="'judgeCase[' + index + '].output'"
                  label="输出"
                  :rules="[{ required: true, message: '输入不能为空' }]"
                >
                  <a-input v-model="item.output" />
                </a-form-item>
              </a-col>
            </a-row>
          </template>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="addJudgeCase" status="success">
          添加判题用例
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          @click="handleSubmit"
          :style="{ width: '300px' }"
        >
          {{ (questionId ? '更新' : '创建') + '题目' }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style>
#add-question {
  margin: 0 10vw;
}
</style>
