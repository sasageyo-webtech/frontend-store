<template>
    <div>
    <Head>
        <Title>Product| {{ product.title }}</Title>
    </Head>
    <div class="container pt-8">
        <h1>Product details number {{ id }}</h1>
    
        <div class="pt-10">
            <img :src=product.thumbnail>
            <div class="detail">
                <h1>{{ product.title }}</h1>
                <h2>Price: {{ product.price }}</h2>
                <h2>Category: {{ product.category }}</h2>
                <h3>Brand: {{ product.brand }}</h3>
                <h4> {{ product.description }}</h4>
            </div>
        </div>
    </div>  
    </div>

</template>

<script setup>
const {id} = useRoute().params
const { data: product } = await useFetch('https://dummyjson.com/products/'+id)
</script>

<style scoped>

.container {
    display: flex;
    justify-content: center;
}

.detail {
    padding-left: 10px;
}
</style>