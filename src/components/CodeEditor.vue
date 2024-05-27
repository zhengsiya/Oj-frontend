<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { ref, onMounted, toRaw, defineEmits, defineProps } from 'vue'

const props = defineProps({
  value: String
})
const emit = defineEmits(['onCodeChange']) //通过父组件传值，将显示的输入交给父组件处理

const editorDom = ref()
const codeEditor = ref()
// const value = ref<string | undefined>('helloworld')

/* 
这段代码只会在组件初次挂载时执行一次，但注册的监听器会在整个组件生命周期内持续有效。也就是说，只要编辑器的内容发生变化，这个监听器就会被触发，无论这个变化发生在何时。
*/
onMounted(() => {
  if (!editorDom.value) return

  //   codeEditor是代码编辑器的实例
  codeEditor.value = monaco.editor.create(editorDom.value, {
    value: props.value,
    language: 'java',
    theme: 'vs-dark', //官方自带三种主题vs, hc-black, or vs-dark
    selectOnLineNumbers: true, //显示行号
    readOnly: false, // 只读
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    }
  })

  // 监听值的变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log('目前内容为：', toRaw(codeEditor.value).getValue())
    emit('onCodeChange', toRaw(codeEditor.value).getValue()) //给父组件实时返回
  })
})

const handleCodeChange = () => {
  if (!codeEditor.value) {
    return
  }
  toRaw(codeEditor.value).setValue('新的值')
}
</script>

<template>
  <div id="code-editor" ref="editorDom" style="min-height: 400px"></div>
  <a-button @click="handleCodeChange">填充值</a-button>
</template>
