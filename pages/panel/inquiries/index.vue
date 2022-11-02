<template>
    
    <v-container class="px-lg-10">
        <v-card flat class="rounded-lg pa-4">
            <h4>
                 درخواست های استعلام کاربران بر اساس دسته بندی انتخاب شده در حساب تامین کننده شما در زیر آمده است. شما میتوانید از این درخواست ها بازدید کرده و با استعلام کننده ارتباط برقرار کنید.
            </h4>
        </v-card>
        <v-row class="my-2">
            <v-col cols="12" md="3">
                <v-card flat>
                    <v-card-title>
                        دسته بندی ها
                    </v-card-title>
                    <v-divider></v-divider>
                        <v-list>
                            <v-list-item v-for="cat in suppCats" :key="cat.id">
                                <v-checkbox
                                v-model="checkboxes"
                                input-value="true"
                                :label="cat.name"
                                :value="cat.id"
                                dense
                                hide-details
                                @change="getInqs"
                                ></v-checkbox>
                            </v-list-item>
                        </v-list>

                </v-card>
            </v-col>
            <v-col v-for="i in inqs" :key="i.id" cols="6" md="3" >
                <v-card class="pa-3 rounded-lg fill-height d-flex flex-column" style="cursor:default" hover>
                    <v-card-title class="pb-0">
                        {{i.attributes.title}}
                    </v-card-title>
                    <v-card-text class="py-0">
                        {{new Date(i.attributes.updatedAt).toLocaleDateString('fa-IR')}}
                    </v-card-text>
                    <v-card-text>
                        {{i.attributes.body}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :href="'tel:'+i.attributes.phone" color="primary">
                            تماس
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    layout: 'panel',
    middleware: 'aintSupplier',
    async asyncData(ctx) {
        
        return {
            supplier: await ctx.$axios.$get(ctx.$config.apiURL + `/api/users/me?populate[supplierAcc][populate]=categories`)
        }

    },
    data: () => ({
        uesrId: '',
        suppCats: [],
        checkboxes: [],
        inqs: [],

    }),

    computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['loggedInUser']),
    },

    mounted() {
        this.uesrId = this.loggedInUser.id;
        this.suppCats = this.supplier.supplierAcc.categories;
        this.checkboxes = this.suppCats.map(({id}) => {return id;});
        this.getInqs();
    },

    methods: {
        getInqs : async function getInqs() {
            const idz = this.checkboxes.map(i => '&filters[categories][id][$eq]='+i).join('');
            // const idz2 = idz.toString();
            this.inqs = await this.$axios.$get(this.$config.apiURL + '/api/inquiries?populate=categories' + idz).then((response) => response.data);
        },
    },   

}
</script>