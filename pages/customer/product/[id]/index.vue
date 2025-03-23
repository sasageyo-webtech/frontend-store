<template>
<div>

    <NuxtLink to="/customer/product" class="flex mx-20 mt-5">
        <svgLess></svgLess>
        <span>Back</span>
    </NuxtLink>



    <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg m-20">

        <!-- image -->
        <div>
            <img :src="product.thumbnail" class="w-full h-40 object-contain" />
        </div>

        <!-- content -->
        <div>

            <p class="card-title text-lg font-bold">{{ product.title }}</p>
            <p class="text-base text-blue-800 pb-2"> {{ product.brand }}</p>
            <p class="text-sm text-gray-600 pb-4">{{ product.description }}</p>

            <div>{{ product.price }} ฿</div>
            <div class="flex place-content-between items-center mt-4">

                <div class="grid grid-cols-3 gap-3">
                    Quantity
                    <div class="flex gap-5">
                        <button>-</button>4<button>+</button>
                    </div>
                    <div class="flex gap-4">
                        200 <div>Pieces Avaliable</div>
                    </div>
                    
                </div>
                <div class="card-actions"> 
                    <svgHeart></svgHeart>
                
                    <button class="btn btn-primary text-[10px] rounded-[30px]">Add to Cart</button>
                    <button class="btn btn-accent text-[10px] rounded-[30px]">Buy Now</button>
                </div>
            </div>
        </div>

    </div>


<!-- reviews -->

    <h1 class="mx-20 mb-10">Product Reviews</h1>
    <div class="mb-20">
        <ProductReviews></ProductReviews>
        <ProductReviews></ProductReviews>
        <ProductReviews></ProductReviews>
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