<template>
  <div class="box">
    <div class="login">
      <h2>login</h2>
      <div>
        <el-form ref="ruleFormRef" :model="login" :rules="rules">
          <el-form-item prop="username">
            <!-- 用户名 -->
            <div class="form-control">
              <input
                v-model="login.username"
                type="value"
                required="false"
                @blur="isusername(ruleFormRef, 'username')"
              />
              <label>
                <span style="transition-delay: 0ms">用</span>
                <span style="transition-delay: 50ms">户</span>
                <span style="transition-delay: 100ms">名</span>
              </label>
            </div>
          </el-form-item>

          <el-form-item prop="password">
            <!-- 密码 -->
            <div class="form-control password">
              <input
                v-model="login.password"
                autocomplete="off"
                :type="login.isShowEye ? 'text' : 'password'"
                required="false"
                @blur="isusername(ruleFormRef, 'password')"
              />
              <label>
                <span style="transition-delay: 0ms">密</span>
                <span style="transition-delay: 50ms">码</span>
              </label>
              <span
                :class="
                  login.isShowEye
                    ? 'iconfont icon-zhengyan eye'
                    : 'iconfont icon-biyan eye'
                "
                @click="isShowEyeFn()"
              ></span>
            </div>
          </el-form-item>

          <el-form-item prop="code">
            <!-- 验证码 -->
            <div class="form-control code">
              <input
                v-model="login.code"
                type="value"
                required="false"
                @blur="isusername(ruleFormRef, 'code')"
              />
              <label>
                <span style="transition-delay: 0ms">验</span>
                <span style="transition-delay: 50ms">证</span>
                <span style="transition-delay: 100ms">码</span>
              </label>

              <div class="codeImg"></div>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录按钮 -->
      <el-button class="loginFn" @click="loginFn(ruleFormRef)">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { loginData } from '@/type/login'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getMenu } from '@/api'
import store from '@/store'
export default defineComponent({
  setup() {
    const { login } = reactive(new loginData())
    // 解耦pinia模块
    const { logOnStore } = store()
    // 获取路由
    const router = useRouter()

    // ref实例
    const ruleFormRef = ref<FormInstance>()

    // 校验规则
    const rules = reactive<FormRules>({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
      ],
    })

    // 失去焦点校验
    const isusername = (formEl: FormInstance | undefined, type: string) => {
      if (!formEl) return
      formEl.validateField(type).catch((e) => {
        e
      })
    }

    // 切换密码显示隐藏
    const isShowEyeFn = () => {
      login.isShowEye = !login.isShowEye
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // 登录按钮
    const loginFn = async (formEl: FormInstance | undefined) => {
      try {
        await logOnStore.logOn()
        const { data: menu } = await getMenu() //获取用户路由
        logOnStore.setAsyncRouter(menu.menus)

        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        router.push('/')
      } catch (e) {
        ElMessage({
          message: '登录失败',
          type: 'error',
        })
      }
    }

    return {
      ruleFormRef,
      isusername,
      login,
      loginFn,
      isShowEyeFn,
      rules,
    }
  },
})
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.box {
  width: 100vw;
  height: 100vh;
  padding-top: 20vh;
  // background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}
.login {
  border-radius: 15px;
  width: 350px;
  background: #000;
  margin: auto;
  padding: 20px 40px 20px;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
  box-shadow: 0px 6px 20px 0px #8bc6ec;
}

h2 {
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
}

:deep(.el-form-item) {
  margin-bottom: 40px;
}

.form-control {
  position: relative;
  width: 100%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  font-size: 18px;
  color: #fff;
  padding-bottom: 2px;
}

.password input {
  position: relative;
  padding-right: 26px;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}

.form-control label {
  position: absolute;
  top: -5px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #fff;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: #add8e6;
  transform: translate(0px, -24px);
}

.eye {
  position: absolute;
  right: 0;
  top: -4px;
  font-size: 30px;
  color: #fff;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
}

.code {
  position: relative;
  margin-right: 100px;
}
.codeImg {
  position: absolute;
  right: -100px;
  top: -14px;
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
}

:deep(.loginFn) {
  width: 270px;
  background-image: linear-gradient(135deg, #90b3e8 0%, #9599e2 100%);
  border: 0;
  color: #fff;
  box-shadow: 0px 0px 6px 0px #8bc6ec;
  &:hover {
    background-image: linear-gradient(135deg, #8cc3eb 100%, #939ee3 100%);
    transform: translateY(-3px);
  }
  &:active {
    background-image: linear-gradient(135deg, #90b3e8 0%, #9599e2 100%);
    transform: translateY(0);
  }
}
</style>
