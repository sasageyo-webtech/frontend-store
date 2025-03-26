<template>
    <div>
        <Imageslide></Imageslide>

        <div class="flex justify-center p-7">
            <NuxtLink to="/customer/product" class="btn btn-primary rounded-[50px] text-[15px] px-10 py-5 place-content-center">
                See all products
            </NuxtLink>
        </div>

        <div class="pb-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
                <Imageslidexs v-for="(imageSet, index) in productImages" :key="index" :images="imageSet" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const productImages = ref([]);

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost/api/products');
        const products = response.data.data.slice(0, 5);

        // ดึงเฉพาะรูปภาพของสินค้าแต่ละรายการ
        productImages.value = products.map(product => 
            product.image_products.map(img => img.image_path)
        );

    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

onMounted(fetchProducts);
</script>
