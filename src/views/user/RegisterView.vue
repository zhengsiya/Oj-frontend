<script setup lang="ts">
import { UserControllerService } from '../../../generated/services/UserControllerService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

const router = useRouter()
// 注册
const handleSubmit = async () => {
  console.log(form.value)
  await UserControllerService.userRegisterUsingPost(form.value)
  router.replace('login')
}

// 选择登录或注册
const handleChangeAction = (value: string | number | boolean) => {
  router.replace(`${value}`)
}

// 校验规则
const rules = {
  userAccount: [{ required: true, message: '账号不能为空' }],
  userPassword: [
    { required: true, message: '密码不能为空' },
    {
      validator: (value: string, cb: (message?: string) => void) => {
        const patten = /^[a-zA-Z0-9,._!@#$%^&*]{6,16}$/
        if (!patten.test(value)) {
          cb('请输入6-16位字母、数字或特殊字符')
        }
      }
    }
  ],
  checkPassword: [
    { required: true, message: '确认密码不能为空' },
    {
      validator: (value: string | number, cb: (message?: string) => void) => {
        if (value !== form.value.userPassword) {
          cb('两次输入密码不一致')
        }
      }
    }
  ]
}
</script>

<template>
  <div id="register">
    <div class="operateRegion">
      <a-radio-group
        type="button"
        :style="{ margin: '20px 0 20px 100px' }"
        default-value="register"
        @change="handleChangeAction"
      >
        <a-radio value="login">登录</a-radio>
        <a-radio value="register">注册</a-radio>
      </a-radio-group>
      <a-form
        :model="form"
        :rules="rules"
        :style="{ width: '500px', margin: '0 auto' }"
        @submit="handleSubmit"
      >
        <a-form-item field="userAccount" label="账号" validate-trigger="blur">
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            :style="{ fontsize: '20px' }"
            size="large"
          />
        </a-form-item>
        <a-form-item field="userPassword" label="密码" validate-trigger="blur">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
            :style="{ fontsize: '20px' }"
            size="large"
          />
        </a-form-item>
        <a-form-item
          field="checkPassword"
          label="确认密码"
          validate-trigger="blur"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
            :style="{ fontsize: '20px' }"
            size="large"
          />
        </a-form-item>

        <a-form-item>
          <a-button html-type="submit" type="primary">注册</a-button>
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
</style>
