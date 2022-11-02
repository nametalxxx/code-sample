<template>
    <v-container class="box">
          <v-row>
            <v-col>
              <v-carousel
              v-model="model"
              cycle="cycle"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              show-arrows-on-hover
              class="rounded-lg"
              >
                <v-carousel-item v-for="(post, index) in posts.data" :key="index" :src="$config.apiURL + post.attributes.featuredImage.data.attributes.formats.small.url">
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <v-overlay absolute>
                      <NuxtLink :to="'/blog/'+ post.attributes.slug">
                        <div class="text-h4 font-weight-bold text-center white--text">
                          {{ post.attributes.title }}
                        </div>
                      </NuxtLink>
                    </v-overlay>
                  </v-row>
                </v-carousel-item>
              </v-carousel>
            </v-col>
          </v-row>
        <v-row>
            <v-col v-for="post, index in posts.data" :key="index" cols="6" lg="3">
            <BlogCard
            :title="post.attributes.title"
            :img="$config.apiURL + post.attributes.featuredImage.data.attributes.formats.small.url"
            :slug="'/blog/'+ post.attributes.slug"
            />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BlogCard from "~/components/UI/BlogCard";

export default {
  name: 'IndexPage',
  components: {
    BlogCard
  },
  async asyncData(ctx) {
    return {
      posts: await ctx.app.$postRepository.index('fields[0]=title&fields[1]=slug&populate=featuredImage'),
      }
  },
  data: () => ({
    model: 0,
  }),
}
</script>