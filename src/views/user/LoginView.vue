<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserControllerService } from '../../../generated/services/UserControllerService'
import { useUserStore } from '@/store/index'
import { Message } from '@arco-design/web-vue'

const userStore = useUserStore()
const { getUserInfo } = userStore

const form = ref({
  userAccount: '',
  userPassword: ''
})
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form.value)
  if (res.code === 40000) {
    Message.error(res.message)
  } else if (res.code === 0) {
    await getUserInfo()
    Message.success('登录成功')

    // router.replace('/')
    router.go(-1)
  }
}

const router = useRouter()

// 选择登录或注册
const handleChangeAction = (value: string | number | boolean) => {
  router.replace(`${value}`)
}
</script>

<template>
  <div id="login">
    <div class="operateRegion">
      <a-radio-group
        type="button"
        :style="{ margin: '20px 0 20px 100px' }"
        default-value="login"
        @change="handleChangeAction"
      >
        <a-radio value="login">登录</a-radio>
        <a-radio value="register">注册</a-radio>
      </a-radio-group>
      <a-form
        :model="form"
        :style="{ width: '500px', margin: '0 auto' }"
        @submit="handleSubmit"
      >
        <a-form-item field="userAccount" label="账号">
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            :style="{ fontsize: '20px' }"
            size="large"
          />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
            :style="{ fontsize: '20px' }"
            size="large"
          />
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.operateRegion {
  margin: 50px auto;
  width: 700px;
}
.arco-btn-size-medium {
  width: 120px;
}
</style>
