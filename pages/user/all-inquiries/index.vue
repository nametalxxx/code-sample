<template>
  <v-card flat class="pa-5 rounded-lg">
    <v-card-title class="pt-0">
      استعلام ها
    </v-card-title>
    <v-card-subtitle>
      همه استعلام های شما در قسمت زیر آمده است. اگر دیگر نیازی به استعلام مورد نظر ندارید می‌توانید آنرا حذف کنید.
    </v-card-subtitle>
    <v-card v-for="(inq, i) in inquiries" :key="inq.id" hover class="my-3" style="cursor: default;" >
      <div class="d-flex flex-no-wrap justify-space-between align-center">
        <div>
          <v-card-title v-text="inq.attributes.title"/>
          <v-card-subtitle>{{inq.attributes.body}}</v-card-subtitle>
        </div>

            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
              :retain-focus="false"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="accent"
                  icon
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  آیا مطمئن هستید؟
                </v-card-title>
                <v-card-text>شما در حال حذف درخواست استعلام خود هستید!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey darken-1"
                    text
                    @click="dialog = false"
                  >
                    خیر
                  </v-btn>
                  <v-btn
                    color="accent"
                    text
                    @click="delInq(inq.id, i)"
                  >
                    بله
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

      </div>
    </v-card>

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
      v-model="delSuccess"
      timeout="3000"
      app
      color="primary"
      top
      outlined
    >
      درخواست استعلام شما حذف شد.
    </v-snackbar>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'isGuest',
  
  data() {
    return {
      dialog: false,
      valid: true,
      err: null,
      snackbar: false,
      delSuccess: false,
      inquiries:[],
    }
  },

    async fetch() {
      this.inquiries = (await this.$axios.get('inquiries/?filters[user][id][$eq]='+this.loggedInUser.id)).data.data
    },
    fetchOnServer: false,
   
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
    async delInq(id,i) {
      try {
        await this.$axios.delete(`inquiries/${id}`)
        this.inquiries.splice(this.inquiries.indexOf(i), 1)
        this.delSuccess = true
        this.dialog = false
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
        this.snackbar = 'ture'
      }
    }
  },
}
</script>