<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';

    definePageMeta({ layout: 'staff' });

    const route = useRoute();
    const productId = route.params.prod_id;
    const product = ref(null);
    const reviews = ref([]);
    const loading = ref(true);
    const errorMessage = ref('');

    const API_BASE = 'http://localhost/api/products';

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`${API_BASE}/${productId}`);
            product.value = response.data.data;
        } catch {
            errorMessage.value = 'Error fetching product details.';
        } finally {
            loading.value = false;
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${API_BASE}/${productId}/reviews`);
            reviews.value = response.data.data;
        } catch {
            errorMessage.value = 'Failed to load reviews.';
        }
    };
    
    const goBack = () => {
        window.history.back();
    };

    onMounted(() => {
        fetchProductDetails();
        fetchReviews();
    });
</script>

<template>
    <div class="container mx-auto px-4 py-6">
        <!-- 🔙 Back Button -->
        <button 
            @click="goBack" 
            class="flex items-center gap-2 px-3 py-1 mb-4 bg-gray-100 text-gray-800 rounded shadow hover:bg-gray-300 border border-[rgba(0,0,0,0.1)]"
        >
            ⬅ Back
        </button>

        <!-- Loading & Errors -->
        <p v-if="loading" class="text-center text-gray-500 text-sm">Loading...</p>
        <p v-if="errorMessage" class="text-red-500 text-center text-sm">{{ errorMessage }}</p>

        <div v-if="product" class="bg-white shadow rounded p-5 max-w-3xl mx-auto shadow-md">
            <!-- Product Details -->
            <div class="flex flex-col md:flex-row gap-5 shadow-xl">
                <img 
                    :src="product.image_products?.[0]?.image_path || 'https://via.placeholder.com/200'"
                    alt="Product Image"
                    class="w-48 h-48 object-cover rounded shadow"
                />
                <div class="flex-1">
                    <h1 class="text-2xl font-bold text-gray-900">{{ product.name }}</h1>
                    <p class="text-md text-gray-600">Brand : {{ product.brand.name }}</p>
                    <p class="text-md text-gray-600">Category : {{ product.category.name }}</p>

                    <!-- Rating -->
                    <div class="flex items-center gap-1 mt-2 text-yellow-400 text-md">
                        <span v-for="n in 5" :key="n">
                            {{ n <= product.rating ? '★' : '☆' }}
                        </span>
                        <span class="text-gray-600 text-sm">( {{ reviews.length }} Reviews )</span>
                    </div>

                    <!-- Price -->
                    <p class="mt-3 text-xl font-bold text-blue-600">
                        {{ product.price }} ฿
                    </p>
                </div>
            </div>

            <!-- Reviews -->
            <div class="mt-7">
                <h2 class="text-lg font-semibold border-b pb-1">Product Reviews</h2>
                <p v-if="reviews.length === 0" class="text-gray-500 text-sm mt-2">No reviews yet.</p>

                <div v-for="review in reviews" :key="review.id" class="p-3 bg-gray-100 rounded mt-3 text-sm border border-[rgba(0,0,0,0.1)]">
                    <div class="flex items-center gap-2 ">
                        <img src="https://via.placeholder.com/40" alt="Profile" class="w-8 h-8 rounded-full border" />
                        <div>
                            <p class="font-semibold">{{ review.username }}</p>
                            <span class="text-yellow-400">
                                <span v-for="n in 5" :key="n">
                                    {{ n <= review.rating ? '★' : '☆' }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <p class="mt-2 text-gray-700">{{ review.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
