<template>
  <v-container fluid class="pa-0">
    <v-carousel
      v-model="model"
      cycle="cycle"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      :height="$vuetify.breakpoint.mobile ? '125' : '500'"
      show-arrows-on-hover
      min-height="250"
    >
      <v-carousel-item v-for="slide in mainPage.data.attributes.slider.data"
      :key="slide.id"
      :src="`${$config.apiURL}${slide.attributes.url ? slide.attributes.url : ''}`"
      :lazy-src="`${$config.apiURL}${slide.attributes.formats.small.url ? slide.attributes.formats.small.url : ''}`" >
      </v-carousel-item>
    </v-carousel>
    <v-container class="box">
      <!-- <v-row class="justify-space-around mb-10">
        <v-col
          v-for="n in 10"
          :key="n"
          class="d-flex flex-column justify-center align-center"
          cols="4"
          md="3"
          lg="1"
        >
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            height="64"
            width="64"
            aspect-ratio="1"
            class="grey lighten-2 rounded-circle center my-2"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="text-subtitle-2 text-center">روغن</div>
        </v-col>
      </v-row> -->
      <v-row class="justify-space-around mb-10">
        <v-col
          v-for="icon in mainPage.data.attributes.belowSlider"
          :key="icon.id"
          class="d-flex flex-column justify-center align-center"
          cols="4"
          md="3"
          lg="1"
        >
          <NuxtLink :to="icon.link">
            <v-img
              :src="`${$config.apiURL}${icon.icon.data.attributes.formats.small.url ? icon.icon.data.attributes.formats.small.url : ''}`"
              :lazy-src="`${$config.apiURL}${icon.icon.data.attributes.formats.small.url ? icon.icon.data.attributes.formats.small.url : ''}`"
              height="64"
              width="64"
              aspect-ratio="1"
              class="grey lighten-2 rounded-circle center my-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="text-subtitle-2 text-center black--text">{{icon.title}}</div>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-row class="mb-n6 px-5">
        <div class="text-h4">پیشنهاد</div>
        <div class="text-h4 primary--text font-weight-bold">شگفت‌انگیز</div>
      </v-row>
      <v-row class="mb-3">
        <v-card
          flat
          dark
          class="mx-auto rounded-xl rounded-sm-none my-6 d-flex flex-row px-0"
          color="primary"
        >
          <v-slide-group class="d-flex flex-row primary py-5">
            <v-slide-item v-for="n in 15" :key="n">
              <v-card
                width="200"
                flat
                light
                style="margin-left: 2px; margin-right: 2px"
              >
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  height="200"
                >
                </v-img>
                <v-card-title> محصول {{ n }} </v-card-title>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-card>
      </v-row>
        <SectionHeader
        title="دسته‌بندی‌ها"
        btn="مشاهده همه"
        link=""
        />

      <!-- <v-row
        v-for="n in 2"
        :key="n"
        :class="n === 2 ? 'justify-space-around mb-10' : 'justify-space-around'"
      >
        <v-col
          v-for="k in 5"
          :key="k"
          class="d-flex flex-column justify-center align-center"
          cols="auto"
          md="3"
          lg="2"
          height="200"
        >
          <v-img
            :src="`https://picsum.photos/500/300?image=${n * 5 + 18 + k}`"
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 18 + k}`"
            height="120"
            width="120"
            aspect-ratio="1"
            class="grey lighten-2 rounded-circle center my-2"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="text-subtitle-1 text-center">خواروبار</div>
        </v-col>
      </v-row> -->

      <v-row class="justify-space-around mb-10">
        <v-col
          v-for="category, index in categories.data"
          :key="'cat'+index"
          class="d-flex flex-column justify-center align-center"
          cols="6"
          md="3"
          lg="3"
          height="200"
        >
          <v-hover style="display:contents">
          <template #default="{ hover }">
            <NuxtLink :to="'/category/'+ category.attributes.slug">
              <v-img
                :src="`${$config.apiURL}${category.attributes.img.data.attributes.url ? category.attributes.img.data.attributes.url : ''}`"
                :lazy-src="`${$config.apiURL}${category.attributes.img.data.attributes.formats.thumbnail.url ? category.attributes.img.data.attributes.formats.thumbnail.url : ''}`"
                :class="`elevation-${hover ? 8 : 2}`"
                height="150"
                width="150"
                aspect-ratio="1"
                class="transition-swing grey lighten-3 rounded-lg center my-2"
              >
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="text-subtitle-1 text-center secondary--text">{{category.attributes.name}}</div>
            </NuxtLink>
          </template>
          </v-hover>
        </v-col>
      </v-row>

      <section class="my-15">
        <SectionHeader
        title="تامین‌کنندگان برتر"
        btn="مشاهده همه"
        link=""
        />

        <v-row>
        <v-col
        v-for="supplier, i in suppliers.data"
        :key="i"
        cols="12"
        lg="3"
        class="d-flex flex-column"
        >
          <SuppCard
          :title="supplier.attributes.name"
          :desc="supplier.attributes.description"
          :location="supplier.attributes.city"
          :img="$config.apiURL + (supplier.attributes.img.data ? supplier.attributes.img.data.attributes.formats.thumbnail.url : '/') "
          :slug="supplier.attributes.slug"
          >
            <template v-for="icon in supplier.attributes.categories.data">
              <CardIcons
              :key="icon.id"
              :icon="$config.apiURL + icon.attributes.icon.data.attributes.formats.thumbnail.url"
              :name="icon.attributes.name"
              :slug="icon.attributes.slug"
              />
            </template>
          </SuppCard>
        </v-col>
        </v-row>
      </section>
      
      <section class="my-15">
        <SectionHeader
        title="بلاگ ساپطور"
        btn="مشاهده بیشتر"
        link="/blog"
        />

        <v-row>
          <v-col v-for="post, index in featuredPosts.data.attributes.posts.data" :key="index" cols="6" lg="3">
            <BlogCard
            :title="post.attributes.title"
            :img="$config.apiURL + post.attributes.featuredImage.data.attributes.formats.small.url"
            :slug="'/blog/'+ post.attributes.slug"
            />
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-container>
</template>

<script>
import SuppCard from "~/components/UI/SuppCard";
import BlogCard from "~/components/UI/BlogCard";
import CardIcons from "~/components/UI/CardIcons";
import SectionHeader from '~/components/UI/SectionHeader';




export default {
  name: 'IndexPage',
  components: {
    SuppCard,
    BlogCard,
    CardIcons,
    SectionHeader
  },
  async asyncData(ctx) {
    return {
      featuredPosts: await ctx.app.$featuredPostRepository.index('populate[posts][fields]=title&populate[posts][fields]=slug&populate[posts][populate]=featuredImage'),
      mainPage: await ctx.app.$mainPageRepository.index('populate[0]=slider&populate[1]=belowSlider.icon'),
      categories: await ctx.app.$categoryRepository.index('filters[topLevel][$eq]=true&populate=icon&populate=img'),
      suppliers: await ctx.app.$supplierRepository.index('populate=img&populate=categories&populate=categories.icon'),
      }
  },
  data: () => ({
    model: 0,
    slider: [
      { src: '/slider/1.jpg' },
      { src: '/slider/2.jpg' },
      { src: '/slider/3.jpg' },
      { src: '/slider/4.jpg' },
      { src: '/slider/5.jpg' },
    ],
    suppliers: [],
  }),
}
</script>