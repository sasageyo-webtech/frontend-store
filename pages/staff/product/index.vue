<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    definePageMeta({
        layout: 'staff',
    })

    const products = ref([])
    const newProduct = ref({
        name: '',
        description: '',
        price: '',
        stock: 0,
        category_id: '',
        brand_id: '',
        image_paths: '',
        rating: 0,
        accessibility: 'PUBLIC',
    })
    const loading = ref(false)
    const errorMessage = ref('')

    // Base API URL (Change this if needed)
    const API_BASE = 'http://localhost/api/products'

    // Fetch products from API using axios
    const fetchProducts = async () => {
        loading.value = true
        errorMessage.value = ''
        try {
            const response = await axios.get(API_BASE)
            products.value = response.data
        } catch (error) {
            console.error('Fetch Error:', error.message)
            errorMessage.value = error.message
            products.value = [] // Ensure it's always an array
        } finally {
            loading.value = false
        }
    }

    // Create a new product using axios
    const createProduct = async () => {
        if (!newProduct.value.name.trim() || !newProduct.value.price || !newProduct.value.category_id || !newProduct.value.brand_id) {
            errorMessage.value = 'Please fill in required fields.'
            return
        }

        try {
            const response = await axios.post(API_BASE, {
                ...newProduct.value,
                image_paths: newProduct.value.image_paths ? newProduct.value.image_paths.split(',') : [],
            })
            if (response.status === 201) {
                location.href = location.href
                products.value.push(response.data) // Add new product to the list
                newProduct.value = { name: '', description: '', price: '', stock: 0, category_id: '', brand_id: '', image_paths: '', rating: 0, accessibility: 'PUBLIC' } // Reset form
            } else {
                errorMessage.value = response.data.message || 'Failed to create product.'
            }
        } catch (error) {
            console.error('Create Error:', error.message)
            errorMessage.value = error.message
        }
    }

    // Delete a product using axios
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE}/${id}`)
            if (response.status === 200) {
                location.href = location.href
                products.value = products.value.filter(p => p.id !== id)
            } else {
                errorMessage.value = 'Failed to delete product.'
            }
        } catch (error) {
            console.error('Delete Error:', error.message)
            errorMessage.value = error.message
        }
    }

    onMounted(fetchProducts)
</script>

<template>
    <div class="mx-auto p-10">
        <h1 class="text-2xl font-bold mb-4">Product List</h1>

        <!-- <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div> -->

        <div class="flex gap-32">
            <div class="w-2/3">
                <div v-if="loading" class="text-gray-500">Loading products...</div>
                <ul v-else class="space-y-2">
                    <li v-for="product in products" :key="product.id" class="flex flex-col justify-between p-2 border rounded">
                        <li v-for="prod in product" class="flex justify-between p-2 border rounded">
                            <div>
                                <span class="font-bold">{{ prod.name }}</span> - ${{ prod.price }} (Stock: {{ prod.stock }})
                            </div>
                            <button @click="deleteProduct(prod.id)" class="bg-red-500 text-white p-1 rounded">Delete</button>
                        </li>
                    </li>
                </ul>
            </div>

            <form @submit.prevent="createProduct" class="mb-4 space-y-2 w-2/3">
                <h1 class="text-xl font-bold mb-4">Create New Product</h1>

                <input v-model="newProduct.name" type="text" placeholder="Product Name" class="border p-2 rounded w-full" required />
                <textarea v-model="newProduct.description" placeholder="Description (optional)" class="border p-2 rounded w-full"></textarea>
                <input v-model="newProduct.price" type="number" placeholder="Price" class="border p-2 rounded w-full" required />
                <input v-model="newProduct.stock" type="number" placeholder="Stock" class="border p-2 rounded w-full" />
                <input v-model="newProduct.category_id" type="text" placeholder="Category ID" class="border p-2 rounded w-full" required />
                <input v-model="newProduct.brand_id" type="text" placeholder="Brand ID" class="border p-2 rounded w-full" required />
                <input v-model="newProduct.image_paths" type="text" placeholder="Image Paths (comma-separated)" class="border p-2 rounded w-full" />
                <input v-model="newProduct.rating" type="number" placeholder="Rating" class="border p-2 rounded w-full" />

                <select v-model="newProduct.accessibility" class="border p-2 rounded w-full">
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                </select>

                <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">Add Product</button>
            </form>
        </div>

    </div>
</template>
