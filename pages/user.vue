<template>
    <v-container fluid class="fill-height grey lighten-4 ma-0 pa-0">
        <v-container class="box">
            <v-row class="ma-0">
                <v-col v-show="$auth.user" cols="12" md="3" class="justify-center align-center">
                    <v-card flat class="pa-5 rounded-lg">
                        <v-card-title class="pb-3 pt-0">منوی کاربری</v-card-title>
                        <v-divider primary></v-divider>
                        <v-list nav>
                        <v-list-item-group
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, i) in navItems"
                            :key="i"
                            :to="item.link"
                            nuxt
                            >
                            <!-- <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon> -->
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols="12" :md="$auth.user ? 9 : 12">
                    <NuxtChild  />
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
        navItems: [
            { title: 'پروفایل', link: '/user/profile/', },
            { title: 'استعلام ها', link: '/user/all-inquiries/' },
            { title: 'استعلام جدید', link: '/user/inquiry/' },
        ]
    }
  },
}
</script>