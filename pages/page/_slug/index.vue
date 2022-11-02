<template>
    <v-container class="box">
        <v-img
        :src="$config.apiURL+ pages.data[0].attributes.image.data.attributes.url"
        height="400"
        class="align-center justify-center rounded-lg mb-6"
        >
        <v-overlay absolute>
           <h1 class="text-center white--text mb-2">{{pages.data[0].attributes.title}}</h1> 
           <div class="text-center text-caption white--text">آخرین بروزرسانی: {{new Date(pages.data[0].attributes.updatedAt).toLocaleDateString('fa-IR')}}</div>
        </v-overlay>
        </v-img>

        <v-container class="box">
            <div v-html="pages.data[0].attributes.content"></div>
        </v-container>
    </v-container>
</template>

<script>

export default {
  name: 'SinglePage',
  components: {

  },
  async asyncData(ctx) {
    return {
      pages: await ctx.app.$pageRepository.showSlug(ctx.params.slug,'populate=image'),
      }
  },

}
</script>