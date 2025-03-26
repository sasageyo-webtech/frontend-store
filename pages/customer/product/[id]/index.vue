<template>
    <div>
    
        <NuxtLink to="/customer/product" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>
    
    
    
        <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg m-20">
    
            <!-- image -->
            <div>
                <Imageslidexs :images="imageSet1" />
                <!-- <img :src="product.thumbnail" class="w-full h-40 object-contain" /> -->
            </div>
    
            <!-- content -->
            <div class="relative">
    
                <p class="card-title text-lg font-bold">{{ product.title }}</p>
                <p class="text-base text-blue-800"> {{ product.brand }}</p>

                <div class="flex py-5">
                      <div class="flex">
                        <SvgStar></SvgStar>  
                        <SvgStar></SvgStar>
                        <SvgGrayStar></SvgGrayStar>
                        <SvgGrayStar></SvgGrayStar>
                        <SvgGrayStar></SvgGrayStar>
                      </div>      
                      <div class="px-5 text-xs text-gray-800">
                        112 Reviewers
                      </div>
                </div>
         

                <p class="text-sm text-gray-600 pb-4">{{ product.description }}</p>
    
                <div><strong>{{ product.price }} ฿ </strong></div>

                <div class="flex place-content-between items-center mt-4 absolute inset-x-0 bottom-0 h-16 ">
    
                    <div class="grid grid-cols-3 gap-3 bg-gray-100 rounded-3xl py-2 px-10">
                        Quantity
                        <div class="flex gap-5">
                            <button>-</button><div class="text-blue-500">4</div><button>+</button>
                        </div>
                        <div class="flex gap-4">
                            <div class="text-blue-500">200</div> <div>Pieces Avaliable</div>
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

    const imageSet1 = [
    'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp'
]
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