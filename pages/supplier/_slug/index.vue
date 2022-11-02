<template>
  <v-container class="box pa-0">
    <v-card
      class="my-5 rounded-lg fill-height pa-0 d-flex flex-column"
      width="100%"
      height="100%"
    >
      <v-img
        id="supheader"
        class="ma-0 pa-0 d-flex align-center justify-center rounded-t-lg"
      >
        <v-row >
          <v-col cols="auto" class="px-6 white rounded-lg ma-auto d-flex flex-column align-center" >
            <v-avatar v-if="(supplier.data[0].attributes.img.data)" id="supavatar" size="128" class="mt-2">
              <v-img
                :src=" 
                  ($config.apiURL +
                  supplier.data[0].attributes.img.data.attributes.url)
                "
              ></v-img>
            </v-avatar>

            <h1 class="text-start secondary--text mt-2">
              {{ supplier.data[0].attributes.name }}
            </h1>

          </v-col>

        </v-row>
      </v-img>

      <v-container class="white d-flex flex-column" style="min-height:360px">
        <v-row class="px-3 justify-center flex-grow-0 mb-3">
          <v-col cols="auto" class="d-flex flex-column" >
            <div class="text-center grey--text">
              <v-icon size="20" color="primary" class="mx-2">mdi-map-marker-outline</v-icon
              >{{ supplier.data[0].attributes.city }}
            </div>
          </v-col>
          <v-divider vertical class="my-3"></v-divider>
          <v-col cols="auto" class="d-flex flex-column" >
            <div class="text-center grey--text">
              <v-icon size="20" color="primary" class="mx-2">mdi-account-check-outline</v-icon
              >عضو ساپطور از: {{new Date(supplier.data[0].attributes.createdAt).toLocaleDateString('fa-IR')}}
            </div>
          </v-col>
        </v-row>

        <v-row class="px-3">
          <v-col cols="12" md="6" class="d-flex flex-column" >
            <div class="text-start">
                <h6 class="text-h6">درباره {{ supplier.data[0].attributes.name }}</h6>
                <p class="ma-1">{{ supplier.data[0].attributes.description }}</p>
            </div>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12" md="6" class="d-flex flex-column" >
                <h6 class="text-h6">تامین کننده دسته‌های:</h6>
            <div class="my-3">
                <v-chip v-for="category in supplier.data[0].attributes.categories.data" :key="category.id" :to="'/category/'+ category.attributes.slug" outlined link nuxt dark color="primary" class="ma-1">
                    <div class="pe-6">{{category.attributes.name}}</div>
                    <v-avatar color="white" size="24" style="position:absolute;left:5px">
                        <v-img
                        :src="$config.apiURL+ category.attributes.icon.data.attributes.formats.thumbnail.url"
                        />
                    </v-avatar>
                </v-chip>
            </div>
          </v-col>
        </v-row>

        <v-card-actions>
        <v-btn
            color="primary"
            depressed
            :href="'tel:'+ supplier.data[0].attributes.tel"
        >
            تماس با تامین کننده
        </v-btn>
        </v-card-actions>

      </v-container>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SingleSupplier',
  components: {},
  async asyncData(ctx) {
    return {
      supplier: await ctx.app.$supplierRepository.showSlug(
        ctx.params.slug,
        'populate=img&populate=icon&populate=categories&populate=categories.icon'
      ),
    }
  },
}
</script>

<style>
#supheader {
  background: url('~/assets/bgpat.jpg') center center !important;
  min-height: 300px;
}
#supavatar {
  border:none
}
</style>