<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

definePageMeta({
    layout: 'staff',
})

const categories = ref([])
const productId = ref(null)
const product = ref({
    name: '',
    description: '',
    price: '',
    stock: 0,
    category_id: '',
    brand_id: '',
    image_paths: [],
    rating: 0,
    accessibility: 'PUBLIC',
})
const selectedFiles = ref([])
const loading = ref(false)
const errorMessage = ref('')
const API_BASE = 'http://localhost/api/products'
const CATEGORY_API_BASE = 'http://localhost/api/categories'

const fetchCategories = async () => {
    try {
        const response = await axios.get(CATEGORY_API_BASE)
        categories.value = response.data
    } catch (error) {
        console.error('Category Fetch Error:', error.message)
        errorMessage.value = 'Failed to fetch categories.'
    }
}

const fetchProduct = async (id) => {
    try {
        const response = await axios.get(`${API_BASE}/${id}`)
        product.value = response.data
    } catch (error) {
        console.error('Product Fetch Error:', error.message)
        errorMessage.value = 'Failed to fetch product.'
    }
}

const handleImageUpload = (event) => {
    selectedFiles.value = Array.from(event.target.files)
}

const updateProduct = async () => {
    if (!product.value.name.trim() || !product.value.price || !product.value.category_id || !product.value.brand_id) {
        errorMessage.value = 'Please fill in required fields.'
        return
    }

    try {
        const updatedProduct = {
            name: product.value.name,
            description: product.value.description,
            price: product.value.price,
            category_id: product.value.category_id,
            brand_id: product.value.brand_id,
            accessibility: product.value.accessibility,
        }

        const response = await axios.put(`${API_BASE}/${productId.value}`, updatedProduct)

        if (response.status === 200) {
            location.href = location.href
        } else {
            errorMessage.value = 'Failed to update product.'
        }
    } catch (error) {
        console.error('Update Error:', error.message)
        errorMessage.value = error.message
    }
}

onMounted(() => {
    const route = useRoute()
    productId.value = route.params.id
    fetchCategories()
    fetchProduct(productId.value)
})
</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl font-bold mb-4">Edit Product</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

        <form @submit.prevent="updateProduct" class="space-y-2">
            <p class="font-bold">Product name:</p>
            <input v-model="product.name" type="text" placeholder="Product Name" class="border p-2 rounded w-full" required />

            <p class="font-bold">Description:</p>
            <textarea v-model="product.description" placeholder="Description (optional)" class="border p-2 rounded w-full"></textarea>

            <p class="font-bold">Price:</p>
            <input v-model="product.price" type="number" placeholder="Price" class="border p-2 rounded w-full" required />

            <p class="font-bold">Category:</p>
            <select v-model="product.category_id" class="border p-2 rounded w-full" required>
                <option value="" disabled>Select a Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>

            <p class="font-bold">Privacy:</p>
            <select v-model="product.accessibility" class="border p-2 rounded w-full">
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
            </select>

            <p class="font-bold">Picture:</p>
            <input type="file" multiple @change="handleImageUpload" class="border p-2 rounded w-full" />

            <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">Update Product</button>
        </form>
    </div>
</template>
