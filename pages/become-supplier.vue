<template>
    <v-container fluid class="fill-height grey lighten-4 ma-0 pa-0">
        <v-container class="box">
            <v-row class="ma-0">
                <v-col>
                    <v-card flat class="pa-5 mb-6">
                        <v-card-title class="pt-0">
                        تامین کننده شوید
                        </v-card-title>
                        <v-card-subtitle>
                        برای ثبت نام به عنوان تامین کننده در ساپطور فرم زیر را با دقت پر بفرمایید.
                        </v-card-subtitle>
                        <v-form
                        ref="updForm"
                        v-model="valid"
                        lazy-validation
                        @submit.prevent="sendRequest"
                        >
                        <v-text-field
                            v-if="isAuthenticated"
                            v-model="username"
                            :rules="usernameRules"
                            outlined
                            label="نام کاربری"
                            required
                            dense
                            disabled
                        ></v-text-field>
                        <v-text-field
                            v-if="isAuthenticated"
                            v-model="email"
                            :rules="emailRules"
                            outlined
                            label="ایمیل"
                            required
                            dense
                            disabled
                        ></v-text-field>
                    
                        <v-text-field
                            v-if="isAuthenticated"
                            v-model="name"
                            outlined
                            label="نام کامل صاحب امتیاز"
                            required
                            dense
                            :disabled =" name ? true : false"
                        ></v-text-field>
                        <v-text-field
                            v-if="isAuthenticated"
                            v-model="mobile"
                            :rules="mobileRules"
                            :disabled =" mobile ? true : false"
                            outlined
                            label="شماره همراه صاحب امتیاز"
                            required
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="supName"
                            :rules="nameRules"
                            outlined
                            label="نام کسب و کار"
                            required
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="supCity"
                            :rules="cityRules"
                            outlined
                            label="شهر تامین کننده"
                            required
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="supTel"
                            :rules="mobileRules"
                            outlined
                            label="شماره تماس کسب و کار"
                            required
                            dense
                        ></v-text-field>
                        <v-text-field
                            v-model="supAdd"
                            :rules="addRules"
                            outlined
                            label="آدرس"
                            required
                            dense
                        ></v-text-field>
                        <v-textarea
                            v-model="supDesc"
                            outlined
                            label="معرفی کسب و کار"
                            required
                            dense
                        ></v-textarea>
                        <v-row class="mb-3 px-3">
                          <template v-for="cat in category.data" >
                            <v-col :key="cat.id" cols="6" class="ma-0 pa-0">
                              <v-checkbox
                              v-model="checkboxes"
                              :label="cat.attributes.name"
                              :value="cat.id"
                              dense
                              hide-details
                              ></v-checkbox>
                            </v-col>
                          </template>
                        </v-row>
                        <v-snackbar
                            v-model="snackbar"
                            timeout="3000"
                            app
                            color="error"
                            top
                            outlined
                        >
                            {{ err }}
                        </v-snackbar>
                        <v-snackbar
                            v-model="sndSuccess"
                            timeout="3000"
                            app
                            color="success"
                            top
                            outlined
                        >
                            فرم درخواست با موفقیت ارسال شد. بزودی با شما تماس خواهیم گرفت.
                        </v-snackbar>
                        <v-btn
                            :disabled="!valid"
                            color="primary"
                            type="submit"
                            @click="$refs.updForm.validate()"
                        >
                            ارسال فرم
                        </v-btn>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'isSupplier',
  async asyncData(ctx) {
  return {
    category: await ctx.app.$categoryRepository.index(
      'filters[topLevel][$eq]=true&populate=sub_categories'
    ),
  }
},
  data() {
    return {
      valid: true,
      checkboxes: [],
      name: '',
      supName: '',
      supCity: '',
      supTel: '',
      supDesc: '',
      supAdd: '',
      nameRules: [(v) => !!v || 'نام ضروری است.'],
      cityRules: [(v) => !!v || 'شهر ضروری است.'],
      addRules: [(v) => !!v || 'شهر ضروری است.'],
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
      sndSuccess: false,
    }
  },
  
    computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['loggedInUser']),
    },

    mounted() {

        this.name = this.isAuthenticated ? this.loggedInUser.name : '';
        this.email = this.isAuthenticated ? this.loggedInUser.email : '';
        this.mobile = this.isAuthenticated ? this.loggedInUser.mobile : '';
        this.username = this.isAuthenticated ? this.loggedInUser.username : '';
        this.id = this.isAuthenticated ? this.loggedInUser.id : '';

    },

  methods: {
    async sendRequest() {
      try {
        await this.$axios.$post('/supplier-forms' , {
          data: {
          users_permissions_user: this.id,
          title: this.supName,
          city: this.supCity,
          address: this.supAdd,
          tel: this.supTel,
          categories: this.checkboxes,
          }
        })
        this.sndSuccess = true
        setTimeout(() => this.$router.push('/'), 1000)
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
        this.snackbar = 'ture'
      }
    },
  },
}
</script>