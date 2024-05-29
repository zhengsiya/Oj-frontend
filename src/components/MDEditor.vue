<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/vue-next'
import { ref, defineEmits, defineProps } from 'vue'

const mdvalue = ref('')
const props = defineProps({
  value: String
})
const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]
// defineProps({ value: String })
const emit = defineEmits(['onMDChange']) //通过父组件传值，将显示的输入交给父组件处理

const handleChange = (v: string) => {
  mdvalue.value = v
  // console.log(v)
  emit('onMDChange', v)
}
</script>

<template>
  <div id="editor">
    <Editor
      :value="props.value"
      :plugins="plugins"
      mode="split"
      @change="handleChange"
    />
  </div>
</template>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right {
  display: none;
}
</style>
