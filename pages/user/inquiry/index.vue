<template>
  <v-card flat class="pa-5 rounded-lg">
    <v-card-title class="pt-0">
      استعلام قیمت
    </v-card-title>
    <v-card-subtitle>
      برای استعلام قیمت کالا یا کالاهای مورد نظرتان از تامین کنندگان ساپطور، فرم زیر را پر کنید.
    </v-card-subtitle>
    <v-form
      ref="inqForm"
      v-model="valid"
      lazy-validation
      width="800px"
      @submit.prevent="confirmInquiry"
    >
      <v-text-field
        v-model="title"
        :rules="titleRules"
        outlined
        label="عنوان"
        required
        dense
      ></v-text-field>

      <v-text-field
        v-model="mobile"
        :rules="mobileRules"
        outlined
        label="شماره تماس"
        required
        dense
      ></v-text-field>

      <v-textarea
        v-model="body"
        :rules="bodyRules"
        outlined
        label="شرح استعلام"
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
        color="accent"
        top
        outlined
      >
        {{ err ? err : 'خطا' }}
      </v-snackbar>

      <v-snackbar
        v-model="inqSuccess"
        timeout="3000"
        app
        color="success"
        top
        outlined
      >
        درخواست استعلام شما با موفقیت ثبت شد.
      </v-snackbar>

      <v-btn
        :disabled="!valid"
        color="primary"
        type="submit"
        @click="$refs.inqForm.validate()"
      >
        ارسال استعلام
      </v-btn>

      <v-dialog
      v-model="confirmDialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          تایید ارسال استعلام
        </v-card-title>

        <v-card-text class="my-3">
          <v-row>عنوان: {{this.title}}</v-row>
          <v-row>شماره همراه: {{this.mobile}}</v-row>
          <v-row>متن استعلام: {{this.body}}</v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="accent"
            text
            @click="confirmDialog = false"
          >
            لغو
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="postInquiry"
          >
            تایید
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'isGuest',
  
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
      title: '',
      titleRules: [(v) => !!v || 'نام ضروری است.'],
      body: '',
      bodyRules: [(v) => !!v || 'توضیحات ضروری است.'],
      mobile: '',
      mobileRules: [
        (v) => !!v || 'شماره موبایل ضروری است.',
        (v) =>
          (v && v.length === 11) || 'شماره موبایل باید حداقل 11 کاراکتر باشد.',
      ],
      checkboxes: [],
      err: null,
      snackbar: false,
      inqSuccess: false,
      confirmDialog: false,
    }
  },
  
    computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['loggedInUser']),
    },

    mounted() {
        this.mobile = this.loggedInUser.mobile;
        this.username = this.loggedInUser.username;
        this.uesrId = this.loggedInUser.id;
    },

  methods: {
    async postInquiry() {
      try {
        await this.$axios.post('inquiries/', {
          data:{
            title: this.title,
            body: this.body,
            phone: this.mobile,
            user: this.uesrId,
            categories: this.checkboxes,
          }
        })
        this.inqSuccess = true
        setTimeout(() => this.$router.push('/user/all-inquiries'), 1000)
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
        this.snackbar = 'ture'
      }
    },

    confirmInquiry() {
      this.confirmDialog = true
    },


  },
  
}
</script>