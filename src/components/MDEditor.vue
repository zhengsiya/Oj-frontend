<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/vue-next'
import { ref, defineEmits } from 'vue'

const value = ref('')
const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]
// defineProps({ value: String })
const emit = defineEmits(['onMDChange']) //通过父组件传值，将显示的输入交给父组件处理

const handleChange = (v: string) => {
  value.value = v
  // console.log(v)
  emit('onMDChange', v)
}
</script>

<template>
  <div id="editor">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>
