<script setup>
const userStore = useUser()
const product = ref(null)
const quantity = ref(1)
const productImages = ref([]);

const increaseQuantity = () => {
    if (quantity.value < product.value.stock) {
        quantity.value++;
    }
};

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const fetchProduct = async () => {
        const {product_id} = useRoute().params
        try {
            const response = await apiClient.get(`/products/${product_id}`);
            product.value = response.data.data
        // ตรวจสอบข้อมูลที่ได้    
        console.log('Product:', product.value);
        console.log('Product Name:', product.value.name);
        console.log('Product Brand:', product.value.brand?.name);
        console.log('Product Images:', product.value.image_products)

        // ดึงเฉพาะรูปภาพของสินค้า
        productImages.value = product.value.image_products.map(img => img.image_path)

        console.log(productImages)

        } catch (error) {
            console.error('Error fetching products:', error);
        }
}

const addToCart = async () => {
    console.log(userStore.userInfo.customer_id, product.value.id, quantity.value);
    try {
        const response = await apiClient.post(`/carts`, {
            customer_id: userStore.userInfo.customer_id,
            product_id: product.value.id,
            amount: quantity.value
        });

        console.log('Response Status:', response.status);

          // 🔄 รีโหลดข้อมูลสินค้าใหม่หลังจากเพิ่มลงตะกร้า
        await fetchProduct(); 
        
    } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
    }
};


onMounted(async () => {
    await userStore.loadUser()
    await fetchProduct()
})


</script>

<template>
    <div>
        <NuxtLink to="/customer/product" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>
        <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg m-20">
            <!-- image -->
            <div>
                <Imageslidexs v-if="productImages" :images="productImages" />
                <!-- <img :src="product.thumbnail" class="w-full h-40 object-contain" /> -->
            </div>
            <!-- content -->
            <div class="relative">
                <p v-if="product" class="card-title text-lg font-bold">{{ product.name }}</p>
                <p v-if="product" class="text-base text-blue-800">{{ product.brand.name }}</p>
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
         

                <p v-if="product" class="text-sm text-gray-600 pb-4">{{ product.description }}</p>
    
                <div><strong v-if="product">{{ product.price }} ฿ </strong></div>

                <div class="flex place-content-between items-center mt-4 absolute inset-x-0 bottom-0 h-16 ">
                    <div class="grid grid-cols-3 gap-3 bg-gray-100 rounded-3xl py-2 px-10">
                        Quantity
                        <div class="flex gap-5">
                            <button @click="decreaseQuantity()">-</button>
                            <div class="text-blue-500">{{ quantity }}</div>
                            <button @click="increaseQuantity()">+</button>
                        </div>

                        <div class="flex gap-4">
                            <div v-if="product" class="text-blue-500">{{ product.stock }}</div> <div>Pieces Avaliable</div>
                        </div>
                        
                    </div>
                    <div class="card-actions"> 
                        <svgHeart></svgHeart>
                    
                        <button @click="addToCart()" class="btn btn-primary text-[10px] rounded-[30px]">Add to Cart</button>
                        <!-- <button class="btn btn-accent text-[10px] rounded-[30px]">Buy Now</button> -->
                    </div>
                </div>

                
            </div>
    
        </div>
    
    
    <!-- reviews -->
    
        <!-- <h1 class="mx-20 mb-10">Product Reviews</h1>
        <div class="mb-20">
            <ProductReviews></ProductReviews>
            <ProductReviews></ProductReviews>
            <ProductReviews></ProductReviews>
        </div> -->
    
        
    </div>
    
    </template>
    
 
    
    <style scoped>
    
    .container {
        display: flex;
        justify-content: center;
    }
    
    .detail {
        padding-left: 10px;
    }
    </style>