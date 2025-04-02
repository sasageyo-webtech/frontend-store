<script setup>

const userStore = useUser()
const user = ref()
const product = ref(null)
const quantity = ref(1)
const products = ref([])
const productImages = ref([])
const reviews = ref([])
const { product_id } = useRoute().params
const router = useRouter()
const showAllReviews = ref(false)

// ✅ เพิ่ม state สำหรับเก็บค่าฟอร์มรีวิว
const reviewText = ref('')
const selectedRating = ref(0)

// 🔼 เพิ่มฟังก์ชันเพิ่ม/ลดจำนวนสินค้า
const increaseQuantity = () => {
    if (quantity.value < product.value.stock) {
        quantity.value++
    }
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

// ✅ ฟังก์ชันดึงข้อมูลสินค้า
const fetchProduct = async () => {
    try {
        const response = await apiClient.get(`/products/${product_id}`)
        product.value = response.data.data

        // ดึงเฉพาะรูปภาพของสินค้า
        productImages.value = product.value.image_products.map(img => img.image_path)
    } catch (error) {
        console.error('Error fetching products:', error)
    }
}

// ✅ ฟังก์ชันดึงข้อมูลรีวิว
const fetchReview = async () => {
    console.log('productID: ', product_id)
    try {
        const response = await apiClient.get(`/products/${product_id}/reviews`)
        reviews.value = response.data.data.slice(0, 5)
    } catch (error) {
        console.error('Error fetching reviews', error)
    }
}

const fetchReviews = async () => {
    console.log('productID: ', product_id)
    try {
        const response = await apiClient.get(`/products/${product_id}/reviews`)
        reviews.value = response.data.data
    } catch (error) {
        console.error('Error fetching reviews', error)
    }
}


// ✅ ฟังก์ชันแนะนำสินค้าในหมวดเดียวกัน
const fetchProductsRecommend = async () => {
    if (!product.value || !product.value.category) return

    try {
        const response = await apiClient.get(`/products/categories/${product.value.category.id}`)
        products.value = response.data.data.slice(0, 8)
    } catch (error) {
        console.error('Error fetching recommended products:', error)
    }
}

// ✅ ฟังก์ชันเพิ่มสินค้าไปยังตะกร้า
const addToCart = async () => {
    if (userStore.isLoggedIn) {
        try {
            await apiClient.post(`/carts`, {
                customer_id: userStore.userInfo.customer_id,
                product_id: product.value.id,
                amount: quantity.value
            })

            router.go(0)

            await fetchProduct()
            router.push('/customer/product')
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message)
        }
    } else {
        router.push('/auth/login')
    }
}

// ✅ ฟังก์ชันสร้างรีวิว
const submitReview = async () => {
   if(userStore.isLoggedIn){

        if (!reviewText.value || selectedRating.value === 0) {
            alert("Please write a review and give a rating before submitting.")
            return
        }

        try {
            const response = await apiClient.post(`/products/${product_id}/reviews`, {
                customer_id: userStore.userInfo.customer_id,
                comment: reviewText.value,
                rating: selectedRating.value
            })

            console.log("Review submitted:", response.data)

            // เพิ่มรีวิวใหม่เข้าไปที่ `reviews`
            reviews.value.unshift({
                user: {
                    username: userStore.userInfo.username,
                    image_path: userStore.userInfo.profile_image
                },
                comment: reviewText.value,
                rating: selectedRating.value
            })

            // เคลียร์ค่าฟอร์ม
            reviewText.value = ''
            selectedRating.value = 0
        } catch (error) {
            console.error("Error submitting review:", error.response?.data || error.message)
        }
    }else {
        router.push('/auth/login')
    }

   }


const toggleReviews = async () => {
    showAllReviews.value = !showAllReviews.value
    if (showAllReviews.value) {
        await fetchReviews() // โหลดรีวิวทั้งหมด
    } else {
        await fetchReview() // โหลดเฉพาะ 5 ตัวแรก
    }
}



onMounted(async () => {
    await userStore.loadUser()
    user.value = userStore.userInfo
    await fetchProduct()
    await fetchReview()
    await fetchProductsRecommend()
})

</script>





<template>
    <div>
        <NuxtLink to="/customer/product" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>
        <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg m-20">
<!--    image        -->
            <div>
                <Imageslidexs v-if="productImages" :images="productImages" />
            </div>
<!--    content      -->
            <div class="relative">
                <div class="flex gap-4">
                    <p v-if="product" class="card-title text-lg font-bold">{{ product.name }}</p>   
                    <div v-if="product" class="badge badge-outline badge-info mt-1">{{ product.category.name }}</div>
                </div>
                
                <p v-if="product" class="text-base text-blue-800">{{ product.brand.name }}</p>
                <div class="flex py-5">
                      <div>
                        <ProductReviewsMain v-if="product && product.rating" :rating="product.rating" />

                      </div>      
                      <div class="px-5 text-xs text-gray-800">
                        {{ reviews.length }} Reviewers
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

                        <button @click="addToCart()" class="btn btn-primary text-[10px] rounded-[30px]">Add to Cart</button>
                      
                    </div>

                </div>

                
            </div>
    
        </div>
    
    
<!--    reviews   -->
        
        <h1 class="mx-20 mb-10">Product Reviews</h1>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <div class="card card-compact bg-base-100 shadow-xl p-4 rounded-lg ml-20
                            bg-[linear-gradient(92deg,#2fe7cc_7%,#a5e43d_99%)]" >
                            <form @submit.prevent="submitReview">
                                <textarea v-model="reviewText" class="textarea w-full" placeholder="Write a Review"></textarea>

                                <div class="fieldset-label text-sm">Your rating</div>
                                <!-- ⭐ ระบบให้คะแนนด้วยดาว -->
                                <div class="rating rating-md">
                                    <input v-model="selectedRating" type="radio" name="rating" value="1" class="mask mask-star-2 bg-yellow-300" />
                                    <input v-model="selectedRating" type="radio" name="rating" value="2" class="mask mask-star-2 bg-yellow-300" />
                                    <input v-model="selectedRating" type="radio" name="rating" value="3" class="mask mask-star-2 bg-yellow-300" />
                                    <input v-model="selectedRating" type="radio" name="rating" value="4" class="mask mask-star-2 bg-yellow-300" />
                                    <input v-model="selectedRating" type="radio" name="rating" value="5" class="mask mask-star-2 bg-yellow-300" />
                                </div>

                                <button type="submit" class="btn w-full">
                                    Send Review
                                </button>
                            </form>    
                                
                </div>                
            </div>

            
            <div class="mx-20 mb-3">
                <ProductReviews
                v-for="(review, index) in reviews" 
                :key="index"
                :username="review.user.username"
                :comment="review.comment" 
                :profile="review.user.image_path"
                :rating="review.rating"
                :time="review.created_at"

                class="mb-2"
                />

                <button @click="toggleReviews" class="btn btn-outline btn-info w-full mt-4">
                    {{ showAllReviews ? 'Close' : 'See All Reviews' }}
                </button>

            </div> 
        </div>

    
<!--   Recommend Products   -->

    <h1 class="mx-20 mb-10">You may also like this</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-20"> 
            <div 
            
                class="card card-compact bg-base-100 shadow-xl p-4 rounded-lg hover:bg-gray-200 duration-300" 
                v-for="(product, index) in products" 
                :key="index">

                <NuxtLink :to="`/customer/product/${product.id}`"> 

                    <figure class="flex justify-center p-4">
                        <img :src="product.image_products[0].image_path" class="max-w-full h-40 object-contain" />
                    </figure>

                    <div class="card-body">
                        
                        <p class="card-title text-lg font-bold">{{ product.name }}</p>
                        <p class="text-base text-blue-800"> {{ product.brand.name }}</p>
            
                        <div class="flex place-content-between">
                            <div class=""> {{ product.price }} ฿</div>
                            <div v-if="product" class="badge badge-outline badge-info mt-1">{{ product.category.name }}</div>
                        </div>

                    </div>

                </NuxtLink>
            </div>

        
    </div>
  

        
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


