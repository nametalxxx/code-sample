<template>
      <v-card flat class="pa-5">
        <v-card-title class="pt-0">
          پروفایل کاربری
        </v-card-title>
        <v-card-subtitle>
          قسمت پیش رو پروفایل شما در ساپطور می‌باشد. برای ویرایش اطلاعات خود، قسمت های قابل ویرایش را در فرم زیر تغییر دهید و سپس دکمه بروزرسانی را فشار دهید.
        </v-card-subtitle>
        <v-form
          ref="updForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="userRegister"
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            outlined
            label="نام کاربری"
            required
            dense
            disabled
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            outlined
            label="ایمیل"
            required
            dense
            disabled
          ></v-text-field>
          
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
            v-model="updSuccess"
            timeout="3000"
            app
            color="primary"
            top
            outlined
          >
            حساب کاربری شما با موفقیت بروزرسانی شد.
          </v-snackbar>

          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
            @click="$refs.updForm.validate()"
          >
            بروزرسانی پروفایل
          </v-btn>

        </v-form>
      </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'isGuest',
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [(v) => !!v || 'نام ضروری است.'],
      username: '',
      usernameRules: [
        (v) => !!v || 'نام کاربری ضروری است.',
        (v) => (v && v.length >= 4) || 'نام کاربری باید حداقل 4 کاراکتر باشد.',
      ],
      mobile: '',
      mobileRules: [
        (v) => !!v || 'شماره موبایل ضروری است.',
        (v) =>
          (v && v.length === 11) || 'شماره موبایل باید حداقل 11 کاراکتر باشد.',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'ایمیل ضروری است.',
        (v) => /.+@.+\..+/.test(v) || 'ایمیل صحیح نیست',
      ],
      err: null,
      snackbar: false,
      updSuccess: false,
    }
  },
  
    computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['loggedInUser']),
    },

    mounted() {
        this.name = this.loggedInUser.name;
        this.email = this.loggedInUser.email;
        this.mobile = this.loggedInUser.mobile;
        this.username = this.loggedInUser.username;
        this.id = this.loggedInUser.id;
    },

  methods: {
    async userRegister() {
      try {
        await this.$axios.put('users/'+ this.id +'', {
          username: this.username,
          email: this.email,
          password: this.password,
          name: this.name,
          mobile: this.mobile,
        })
        this.updSuccess = true
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
        this.snackbar = 'ture'
      }
    },
  },
}
</script>