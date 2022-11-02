<template>
  <v-container class="box">
    <v-img
      :src="
        (category.data[0].attributes.img.data ? $config.apiURL + category.data[0].attributes.img.data.attributes.url : require('~/assets/bgpat.jpg'))
      "
      height="400"
      class="align-center justify-center rounded-lg mb-6"
    >
      <v-overlay absolute>
        <h1 class="text-center white--text mb-2">
          {{ category.data[0].attributes.name }}
        </h1>
        <div class="text-center text-caption white--text">
          {{ category.data[0].attributes.desctription }}
        </div>
      </v-overlay>
    </v-img>

    <v-container class="pa-0">
      <section class="my-15">

        <SectionHeader
        :title="'تامین‌کنندگان ' + category.data[0].attributes.name"
        btn="مشاهده همه دسته‌ها"
        link=""
        />
        <v-row>
          <v-col v-if="!category.data[0].attributes.suppliers.data.length" class="fill-height">
            <h3 class="text-center text-h6 pa-3">متاسفانه در دسته مورد نظر تامین کننده‌ای پیدا نشد.</h3>
          </v-col>
          <v-col
            v-for="supplier in category.data[0].attributes.suppliers.data"
            :key="supplier.id"
            cols="12"
            lg="3"
            class="d-flex flex-column"
          >
            <SuppCard
              :title="supplier.attributes.name"
              :desc="supplier.attributes.description"
              :location="supplier.attributes.city"
              :img="
                $config.apiURL +
                (supplier.attributes.img.data
                  ? supplier.attributes.img.data.attributes.formats.thumbnail
                      .url
                  : '/')
              "
              :slug="supplier.attributes.slug"
            >
              <template
                v-for="(icon, i) in supplier.attributes.categories.data"
              >
                <CardIcons
                  :key="i"
                  :icon="
                    $config.apiURL +
                    icon.attributes.icon.data.attributes.formats.thumbnail.url
                  "
                  :name="icon.attributes.name"
                  :slug="icon.attributes.slug"
                />
              </template>
            </SuppCard>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-container>
</template>

<script>
import SuppCard from '~/components/UI/SuppCard'
import CardIcons from '~/components/UI/CardIcons'
import SectionHeader from '~/components/UI/SectionHeader'

export default {
  name: 'SingleCategory',
  components: {
    SuppCard,
    CardIcons,
    SectionHeader
  },
  async asyncData(ctx) {
    return {
      category: await ctx.app.$categoryRepository.showSlug(
        ctx.params.slug,
        'populate=img&populate=suppliers&populate=suppliers.img&populate=suppliers.categories$&populate=suppliers.categories.icon'
      ),
    }
  },
}
</script>