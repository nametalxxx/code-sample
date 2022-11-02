<template>
  <v-container fluid class="fill-height justify-center grey lighten-4 pa-0">
    <v-card flat width="640" class="rounded-lg mb-2">
      <v-tabs v-model="tabs" fixed-tabs background-color="primary" dark>
        <v-tabs-slider color="secondary"></v-tabs-slider>
        <v-tab href="#login">ورود تامین‌کنندگان</v-tab>
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
      select: null,
      loginShowPass: false,
      loginPassword: '',
      loginIdentifier: '',
      checkbox: false,
      err: null,
      snackbar: false,
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
        } finally {
            setTimeout(() => this.$router.push('/panel/'), 500)
        }
      },      
    },
}
</script>