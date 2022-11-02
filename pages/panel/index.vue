<template>
    
    <v-container class="px-lg-10">
        <v-card flat class="rounded-lg pa-4">
            <h2>
                تامین کننده گرامی خوش آمدید.
            </h2>
        </v-card>
    </v-container>
    
</template>

<script>
export default {
    layout: 'panel',
    middleware: 'aintSupplier',

    data: () => ({
    }),
    
}
</script>