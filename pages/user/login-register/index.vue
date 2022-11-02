<template>
  <v-container fluid class="fill-height justify-center grey lighten-4 pa-0">
    <v-card flat width="640" class="rounded-lg mb-2">
      <v-tabs v-model="tabs" fixed-tabs background-color="primary" dark>
        <v-tabs-slider color="secondary"></v-tabs-slider>
        <v-tab href="#login"> ورود </v-tab>
        <v-tab href="#register"> عضویت </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item value="login">
          <v-card flat class="pa-5">
            <v-form ref="logForm" v-model="valid" lazy-validation @submit.prevent="userLogin">
              <v-text-field
                v-model="loginIdentifier"
                outlined
                :rules="emailRules"
                label="ایمیل"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginPassword"
                :append-icon="loginShowPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="loginShowPass ? 'text' : 'password'"
                outlined
                :rules="passwordRules"
                label="کلمه عبور"
                required
                @click:append="loginShowPass = !loginShowPass"
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="primary"
                class="mt-2"
                type="submit"
                @click="$refs.logForm.validate()"
              >
                ورود
              </v-btn>
            </v-form>
            <v-snackbar
              v-model="snackbar"
              timeout="3000"
              app
              color="accent"
              top
              outlined
            >
              {{ err }}

            </v-snackbar>
          </v-card>
        </v-tab-item>
        <v-tab-item value="register">
          <v-card flat class="pa-5">
            <v-form ref="regForm" v-model="valid" lazy-validation @submit.prevent="userRegister">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                outlined
                label="نام کامل"
                required
                dense
              ></v-text-field>

              <v-text-field
                v-model="mobile"
                :rules="mobileRules"
                outlined
                label="شماره موبایل"
                required
                dense
              ></v-text-field>

              <v-text-field
                v-model="username"
                :rules="usernameRules"
                outlined
                label="نام کاربری"
                required
                dense
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                outlined
                label="ایمیل"
                required
                dense
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="registerShowPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="registerShowPass ? 'text' : 'password'"
                outlined
                :rules="passwordRules"
                label="کلمه عبور"
                required
                dense
                @click:append="registerShowPass = !registerShowPass"
              ></v-text-field>

              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'برای ادامه باید با شرایط و فوانین موافقت کنید']"
                label="با شرایط و قوانین ساپطور موافقم"
                dense
                required
              ></v-checkbox>

              <v-snackbar
                v-model="snackbar"
                timeout="3000"
                app
                color="accent"
                top
                outlined
              >
                {{ err }}

              </v-snackbar>

              <v-snackbar
                v-model="regSuccess"
                timeout="3000"
                app
                color="primary"
                top
                outlined
              >
                حساب کاربری شما با موفقیت ساخته شد.

              </v-snackbar>

              <v-btn
                :disabled="!valid"
                color="primary"
                type="submit"
                @click="$refs.regForm.validate()"
              >
                عضویت
              </v-btn>

              <v-btn plain dark color="grey lighten-1" @click="$refs.regForm.reset()">
                پاک کردن فرم
              </v-btn>

            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: 'isUser',
  data() {
    return {
      tabs: null,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'نام ضروری است.',
      ],
      username:'',
      usernameRules: [
        v => !!v || 'نام کاربری ضروری است.',
        v => (v && v.length >= 6) || 'نام کاربری باید حداقل 6 کاراکتر باشد.',
      ],
      mobile:'',
      mobileRules: [
        v => !!v || 'شماره موبایل ضروری است.',
        v => (v && v.length === 11) || 'شماره موبایل باید حداقل 11 کاراکتر باشد.',
      ],
      email: '',
      emailRules: [
        v => !!v || 'ایمیل ضروری است.',
        v => /.+@.+\..+/.test(v) || 'ایمیل صحیح نیست',
      ],
      password:'',
      passwordRules: [
        v => !!v || 'کلمه‌عبور ضروری است.',
        v => (v && v.length >= 7) || 'کلمه‌عبور باید حداقل شامل 8 کاراکتر باشد.',
      ],
      registerShowPass: false,
      select: null,
      loginShowPass: false,
      loginPassword: '',
      loginIdentifier: '',
      checkbox: false,
      err: null,
      snackbar: false,
      regSuccess: false,
    }
  },
      methods: {
      async userLogin() {
        try {
          await this.$auth.loginWith('local', {
            data: { identifier: this.loginIdentifier, password: this.loginPassword },
          })
        } catch (e) {
          if (e.response) this.err = e.response.data.error.message; this.snackbar= 'ture';
        }
      },
      
      async userRegister() {
        try {
          this.$axios.setToken(false)
          await this.$axios.post('auth/local/register', {
            username: this.username,
            email: this.email,
            password: this.password,
            name: this.name,
            mobile: this.mobile
          })
          this.regSuccess = true
        } catch (e) {
          if (e.response) this.err = e.response.data.error.message; this.snackbar= 'ture';
        }
      },
    },
}
</script>