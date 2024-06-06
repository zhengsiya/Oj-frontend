<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserControllerService } from '../../../generated/services/UserControllerService'
import { useUserStore } from '@/store/index'
import { Message } from '@arco-design/web-vue'

const userStore = useUserStore()
const { getUserInfo, clearUser } = userStore

onMounted(() => {
  // 先清空用户仓库中的信息
  clearUser()
})

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
      <div id="form">
        <a-radio-group
          type="button"
          :style="{ margin: '40px 0 30px 0px' }"
          default-value="login"
          @change="handleChangeAction"
        >
          <a-radio value="login">登录</a-radio>
          <a-radio value="register">注册</a-radio>
        </a-radio-group>
        <a-form :model="form" @submit="handleSubmit">
          <a-form-item field="userAccount" label="账号" required>
            <a-input
              v-model="form.userAccount"
              placeholder="请输入账号"
              :style="{ fontsize: '20px', width: '300px' }"
              size="large"
            />
          </a-form-item>
          <a-form-item field="userPassword" label="密码" required>
            <a-input-password
              v-model="form.userPassword"
              placeholder="请输入密码"
              :style="{ fontsize: '20px', width: '300px' }"
              size="large"
            />
          </a-form-item>

          <a-form-item>
            <a-button html-type="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#login {
  width: 100%;
}
.operateRegion {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vh auto;
  width: 60vh;
  height: 75%;
  background-image: linear-gradient(
    135deg,
    #fde49e 0%,
    #a7e6ff 20%,
    #fefefe 35%
  );
  border-radius: 30px;
}
#form {
  width: 380px;
  height: 100%;
}
.arco-btn-size-medium {
  width: 120px;
}
</style>
