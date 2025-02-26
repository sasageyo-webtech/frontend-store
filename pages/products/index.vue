<template>
    <div class="p-8">
        <div class="flex justify-between">
            <strong class="text-xl font-semibold align-baseline">All Products</strong>
            <LayoutsSearchbar></LayoutsSearchbar>
        </div>

        <div class="flex">
            <div>
                <LayoutsSidebar></LayoutsSidebar>
            </div>

           <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <div 
                class="card card-compact bg-base-100 shadow-xl p-4 rounded-lg" 
                v-for="(product, index) in data.products" 
                :key="index"
            >
                <NuxtLink :to="`/products/${product.id}`">
                    <figure class="flex justify-center p-4">
                        <img :src="product.thumbnail" class="max-w-full h-40 object-contain" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title text-lg font-bold">{{ product.title }}</h2>
                        <p class="text-sm text-gray-600">{{ product.description }}</p>
                        <div class="card-actions justify-end mt-4">
                            <button class="btn btn-primary">ADD TO CART</button>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            </div> 
        </div>
        

        
    </div>
</template>


<script setup>

useHead({
    title: "All product",
    meta: [
        { name: "description" , content: "online store, skincare, medicine"}
    ]
})

const { data: data } = await useFetch('https://dummyjson.com/products?limit=10')
console.log(data)

</script>