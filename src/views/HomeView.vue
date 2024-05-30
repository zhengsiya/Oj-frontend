<script setup lang="ts">
import { ref } from 'vue'
import MDEditor from '@/components/MDEditor.vue'
import CodeEditor from '@/components/CodeEditor.vue'

const mdValue = ref('') //仅作为初始化数值传递给MDEditor组件
const handleMDChange = (v: string) => {
  console.log(v)
}

const codeValue = ref('') //仅作为初始化数值传递给MDEditor组件
const handleCodeChange = (v: string) => {
  console.log('来自父组件', v)
}
</script>

<template>
  <div id="home">
    <CodeEditor :value="codeValue" @onCodeChange="handleCodeChange" />
    <MDEditor :value="mdValue" @onMDChange="handleMDChange" />
  </div>
</template>

<style></style>
