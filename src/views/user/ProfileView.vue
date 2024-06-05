<script setup lang="ts">
import { FileItem } from '@arco-design/web-vue'
import { ref } from 'vue'
import { UserControllerService } from '../../../generated/services/UserControllerService'
const form = ref({
  userName: '',
  userAvatar: ''
})

const file = ref()

const onChange = (_: unknown, currentFile: FileItem) => {
  file.value = {
    ...currentFile
    // url: URL.createObjectURL(currentFile.file),
  }
  form.value.userAvatar = file.value.url
  console.log(form.value.userAvatar)
}
const onProgress = (currentFile: FileItem) => {
  file.value = currentFile
}

const submitProfile = async () => {
  console.log(form.value)
  await UserControllerService.updateUserUsingPost(form.value)
}
</script>

<template>
  <div id="profile">
    <a-card
      class="profile"
      title="修改用户信息"
      :style="{ width: '800px', margin: '20px auto' }"
      :bordered="false"
    >
      <a-form :model="form" :style="{ width: '600px' }">
        <a-form-item field="userAvatar" label="头像">
          <a-upload
            :fileList="file ? [file] : []"
            :show-file-list="false"
            @change="onChange"
            @progress="onProgress"
          >
            <template #upload-button>
              <div
                :class="`arco-upload-list-item${
                  file && file.status === 'error'
                    ? ' arco-upload-list-item-error'
                    : ''
                }`"
              >
                <div
                  class="arco-upload-list-picture custom-upload-avatar"
                  v-if="file && file.url"
                >
                  <img :src="file.url" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-progress
                    v-if="file.status === 'uploading' && file.percent < 100"
                    :percent="file.percent"
                    type="circle"
                    size="mini"
                    :style="{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translateX(-50%) translateY(-50%)'
                    }"
                  />
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
          <!-- <a-upload list-type="picture">
            <a-avatar
              v-model="form.userAvatar"
              :size="64"
              :src="form.userAvatar"
              @click="handleAvatar"
            >
              <IconUser v-if="!src" />
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar>
          </a-upload> -->
        </a-form-item>
        <a-form-item
          field="userName"
          label="用户名"
          validate-trigger="input"
          required
        >
          <a-input
            v-model="form.userName"
            placeholder="please enter your username..."
          />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" @click="submitProfile"
            >修改信息</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.profile {
  width: 800px;
}
</style>
