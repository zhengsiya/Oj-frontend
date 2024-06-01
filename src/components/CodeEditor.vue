<script setup lang="ts">
import * as monaco from 'monaco-editor'
import {
  ref,
  onMounted,
  toRaw,
  defineEmits,
  defineProps,
  watchEffect
} from 'vue'

const props = defineProps({
  value: String
})
const emit = defineEmits(['onCodeChange']) //通过父组件传值，将显示的输入交给父组件处理

const editorDom = ref()
const codeEditor = ref()
const selectedLanguage = ref('java')
const languages = ref(['javascript', 'python', 'java', 'csharp', 'php', 'C++'])

/* 
这段代码只会在组件初次挂载时执行一次，但注册的监听器会在整个组件生命周期内持续有效。
也就是说，只要编辑器的内容发生变化，这个监听器就会被触发，无论这个变化发生在何时。
*/
onMounted(() => {
  if (!editorDom.value) return

  //   codeEditor是代码编辑器的实例
  codeEditor.value = monaco.editor.create(editorDom.value, {
    value: props.value,
    language: selectedLanguage.value,
    theme: 'vs', //官方自带三种主题vs, hc-black, or vs-dark
    selectOnLineNumbers: true, //显示行号
    readOnly: false, // 只读
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    }
  })

  monaco.editor.defineTheme('myTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.foreground': '#000000',
      'editor.background': '#F5F7F8'
    }
  })
  monaco.editor.setTheme('myTheme')

  // 监听值的变化
  codeEditor.value.onDidChangeModelContent(() => {
    emit(
      'onCodeChange',
      toRaw(codeEditor.value).getValue(),
      selectedLanguage.value
    ) //给父组件实时返回
  })

  // 监听语言的变化
  watchEffect(() => {
    emit(
      'onCodeChange',
      toRaw(codeEditor.value).getValue(),
      selectedLanguage.value
    )
  })
})
</script>

<template>
  <div>
    <a-select v-model="selectedLanguage" :style="{ width: '120px' }">
      <a-option v-for="lang in languages" :key="lang" :value="lang">
        {{ lang }}
      </a-option>
    </a-select>
    <div id="code-editor" ref="editorDom" style="min-height: 500px"></div>
  </div>
</template>
