can u just split to two file of view and create product without changing the code but still work the same, <script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    definePageMeta({
        layout: 'staff',
    })

    const products = ref([])
    const categories = ref([])
    const newCategory = ref('')
    // const brands = ref([])
    // const newBrand = ref('')
    const newProduct = ref({
        name: '',
        description: '',
        price: '',
        stock: 0,
        category_id: '',
        brand_id: '',
        image_paths: [],  // Store files as an array
        rating: 0,
        accessibility: 'PUBLIC',
    })
    const selectedFiles = ref([])
    const loading = ref(false)
    const errorMessage = ref('')
    const API_BASE = 'http://localhost/api/products'
    const CATEGORY_API_BASE = 'http://localhost/api/categories'
    // const BRAND_API_BASE = 'http://localhost/api/brands'

    const fetchProducts = async () => {
        loading.value = true
        errorMessage.value = ''
        try {
            const response = await axios.get(API_BASE)
            products.value = response.data
        } catch (error) {
            console.error('Fetch Error:', error.message)
            errorMessage.value = error.message
            products.value = []
        } finally {
            loading.value = false
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORY_API_BASE)
            categories.value = response.data
        } catch (error) {
            console.error('Category Fetch Error:', error.message)
            errorMessage.value = 'Failed to fetch categories.'
        }
    }

    // const fetchBrands = async () => {
    //     try {
    //         const response = await axios.get(BRAND_API_BASE)
    //         brands.value = response.data
    //     } catch (error) {
    //         console.error('Category Fetch Error:', error.message)
    //         errorMessage.value = 'Failed to fetch brands.'
    //     }
    // }

    const handleImageUpload = (event) => {
        selectedFiles.value = Array.from(event.target.files);
    }


    const createProduct = async () => {
        if (!newProduct.value.name.trim() || !newProduct.value.price || !newProduct.value.category_id || !newProduct.value.brand_id) {
            errorMessage.value = 'Please fill in required fields.'
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', newProduct.value.name)
            formData.append('description', newProduct.value.description)
            formData.append('price', newProduct.value.price)
            // formData.append('stock', newProduct.value.stock)
            formData.append('category_id', newProduct.value.category_id)
            formData.append('brand_id', newProduct.value.brand_id)
            // formData.append('rating', newProduct.value.rating)
            formData.append('accessibility', newProduct.value.accessibility)

            selectedFiles.value.forEach((file) => {
                formData.append('image_paths[]', file)
            })

            const response = await axios.post(API_BASE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (response.status === 201) {
                location.href = location.href
                products.value.push(response.data)
                newProduct.value = { name: '', description: '', price: '', stock: 0, category_id: '', brand_id: '', image_paths: [], rating: 0, accessibility: 'PUBLIC' }
                selectedFiles.value = []
            } else {
                errorMessage.value = response.data.message || 'Failed to create product.'
            }
        } catch (error) {
            console.error('Create Error:', error.message)
            errorMessage.value = error.message
        }
    }

    const createCategory = async () => {
        if (!newCategory.value.trim()) {
            errorMessage.value = 'Please enter a category name.'
            return
        }

        try {
            const response = await axios.post(CATEGORY_API_BASE, { name: newCategory.value })
            if (response.status === 201) {
                categories.value.push(response.data)
                newCategory.value = ''
            }
        } catch (error) {
            console.error('Create Category Error:', error.message)
            errorMessage.value = 'Failed to create category.'
        }
    }

    // const createBrand = async () => {
    //     if (!newBrand.value.trim()) {
    //         errorMessage.value = 'Please enter a Brand name.'
    //         return
    //     }

    //     try {
    //         const response = await axios.post(BRAND_API_BASE, { name: newBrand.value })
    //         if (response.status === 201) {
    //             brands.value.push(response.data)
    //             newBrand.value = ''
    //         }
    //     } catch (error) {
    //         console.error('Create Brand Error:', error.message)
    //         errorMessage.value = 'Failed to create Brand.'
    //     }
    // }

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

    onMounted(() => {
        fetchProducts()
        fetchCategories()
    })
</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl font-bold mb-4">Product List</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

        <div class="flex w-screen gap-32">
            <div class="w-1/3">
                <div v-if="loading" class="text-gray-500">Loading products...</div>
                <ul v-else class="space-y-2">
                    <li v-for="product in products" :key="product.id" class="flex flex-col justify-between p-2 border border-gray-400 rounded">
                        <li v-for="prod in product" class="flex justify-between items-center my-1 p-2 px-3 border border-gray-400 rounded">
                            <div class="flex items-center">
                                <img :src="prod.image_paths[0]" alt="Product Image" class="w-16 h-16 object-cover mr-4 rounded" />
                                <div>
                                    <span class="font-bold">{{ prod.name }}</span> : ${{ prod.price }} (Stock: {{ prod.stock }})
                                </div>
                            </div>

                            <button @click="deleteProduct(prod.id)" class="bg-red-500 text-white p-1 px-4 rounded">Delete</button>
                        </li>
                    </li>
                </ul>
            </div>

            <form @submit.prevent="createProduct" class="w-1/3 mb-4 space-y-2">
                <h1 class="text-xl font-bold mb-4">Create New Product</h1>

                <p class="font-bold">Product name :</p>
                <input v-model="newProduct.name" type="text" placeholder="product Name" class="border p-2 rounded w-full" required />
                
                <p class="font-bold">Description :</p>
                <textarea v-model="newProduct.description" placeholder="description (optional)" class="border p-2 rounded w-full"></textarea>
                
                <p class="font-bold">Price :</p>
                <input v-model="newProduct.price" type="number" placeholder="price" class="border p-2 rounded w-full" required />
                
                <!-- CATEGORY -->
                <p class="font-bold">Category :</p>
                <select v-model="newProduct.category_id" class="border p-2 rounded w-full" required>
                    <li v-for="category in categories" :key="category.id" :value="category.id">
                        <option value="" disabled selected>Select a Category</option>
                        <option v-for="cate in category" :key="cate.id" :value="cate.id">
                            {{ cate.name }}
                        </option>   
                    </li>
                </select>
                <div class="mt-2">
                    <input v-model="newCategory" type="text" placeholder="Add New Category Name" class="border p-2 rounded w-full" />
                    <button @click.prevent="createCategory" class="bg-blue-500 text-white p-2 rounded w-full mt-2">Create New Category</button>
                </div>

                <!-- BRAND -->
                <!-- <p class="font-bold">Brand :</p>
                <select v-model="newProduct.brand_id" placeholder="brand" class="border p-2 rounded w-full" required>
                    <li v-for="brand in brands" :key="brand.id" :value="brand.id">
                        <option value="" disabled selected>Select a Brand</option>
                        <option v-for="b in brand" :key="b.id" :value="b.id">
                            {{ b.name }}
                        </option>   
                    </li>
                </select>
                <div class="mt-2">
                    <input v-model="newBrand" type="text" placeholder="Add New Brand Name" class="border p-2 rounded w-full" />
                    <button @click.prevent="createBrand" class="bg-blue-500 text-white p-2 rounded w-full mt-2">Create New Brand</button>
                </div> -->

                <p class="font-bold">Picture :</p>
                <div class="relative border border-black border-1 rounded-md p-2 pt-3 w-fit">
                    <input type="file" multiple id="image-upload" class=""/>
                    <label for="image-upload" class="py-2 px-5 bg-blue-500 text-white text-sm rounded-lg text-lg hover:bg-blue-600">
                        Choose Image(s)
                    </label>    
                </div>

                <p class="font-bold">Privacy :</p>
                <select v-model="newProduct.accessibility" class="border p-2 rounded w-full">
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                </select>

                <button type="submit" class="bg-green-500 text-white p-2 rounded w-full">Add Product</button>
            </form>

        </div>

    </div>
</template>
