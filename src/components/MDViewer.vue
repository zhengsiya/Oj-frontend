<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Viewer } from '@bytemd/vue-next'
import { defineProps } from 'vue'

const props = defineProps({
  value: String
})

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]
</script>

<template>
  <div id="viewer">
    <Viewer
      :value="props.value"
      :plugins="plugins"
      :style="{ color: '#373A40' }"
    />
  </div>
</template>

<style>
/* Add your styles here */
</style>
