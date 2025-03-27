<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Report from '@/components/staff/modals/Report.vue';

    definePageMeta({ layout: 'staff' });

    const showSuccessCreateProduct = ref(false);
    const showSuccessCreateCategory = ref(false);
    const showSuccessCreateBrand = ref(false);
    const loading = ref(false);
    const products = ref([]);
    const categories = ref([]);
    const newCategory = ref('');
    const brands = ref([]);
    const newBrand = ref('');
    const newProduct = ref({
        name: '',
        description: '',
        price: '',
        stock: 0,
        category_id: '',
        brand_id: '',
        image_products: [],
        rating: 0,
        accessibility: 'PUBLIC',
    });
    const selectedFiles = ref([]);
    const errorMessage = ref('');

    const API_BASE = 'http://localhost/api/products';
    const CATEGORY_API_BASE = 'http://localhost/api/categories';
    const BRAND_API_BASE = 'http://localhost/api/brands';

    const fetchProducts = async () => {
        loading.value = true;
        errorMessage.value = '';
        try {
            const response = await axios.get(API_BASE);
            products.value = response.data.data;
        } catch (error) {
            console.error('Fetch Error:', error.message);
            errorMessage.value = error.message;
            products.value = [];
        } finally {
            loading.value = false;
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORY_API_BASE);
            categories.value = response.data.data;
        } catch (error) {
            console.error('Category Fetch Error:', error.message);
            errorMessage.value = 'Failed to fetch categories.';
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get(BRAND_API_BASE);
            brands.value = response.data;
        } catch (error) {
            console.error('Brand Fetch Error:', error.message);
            errorMessage.value = 'Failed to fetch brands.';
        }
    };

    const createProduct = async () => {
        if (!newProduct.value.name.trim() || !newProduct.value.price) {
            errorMessage.value = 'Please fill in required fields.';
            return;
        }
        try {
            console.log("New Product: ", newProduct)
            newProduct.value.image_products = await uploadImages(newProduct.value.id, selectedFiles.value);
            const response = await axios.post(API_BASE, newProduct.value);
            if (response.status === 201) {
                showSuccessCreateProduct.value = true;
            } else {
                errorMessage.value = response.data.message || 'Failed to create product.';
            }
        } catch (error) {
            console.error('Create Error:', error.message);
            errorMessage.value = error.message;
        }
    };

    const createCategory = async () => {
        if (!newCategory.value.trim()) {
            errorMessage.value = 'Please enter a category name.'
            return
        }

        try {
            const response = await axios.post(CATEGORY_API_BASE, { name: newCategory.value })
            if (response.status === 201) {
                showSuccessCreateCategory.value = true;
                categories.value.push(response.data)
                newCategory.value = ''
            }
        } catch (error) {
            console.error('Create Category Error:', error.message)
            errorMessage.value = 'Failed to create category.'
        }
    }

    const createBrand = async () => {
        if (!newBrand.value.trim()) {
            errorMessage.value = 'Please enter a Brand name.'
            return
        }

        try {
            const response = await axios.post(BRAND_API_BASE, { name: newBrand.value })
            if (response.status === 201) { 
                showSuccessCreateBrand.value = true;   
                brands.value.push(response.data)
                newBrand.value = ''
            }
        } catch (error) {
            console.error('Create Brand Error:', error.message)
            errorMessage.value = 'Failed to create Brand.'
        }
    }

    onMounted(() => {
        fetchProducts();
        fetchCategories();
        fetchBrands();
    });
</script>

<template>
    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

    <form @submit.prevent="createProduct" class="mt-10 mx-16 w-1/2 space-y-2">
        <h1 class="text-xl font-bold mb-4">Create New Product</h1>

        <p class="font-bold">Product name :</p>
        <input v-model="newProduct.name" type="text" placeholder="product name" class="border p-2 rounded w-full" required />
        
        <p class="font-bold">Description :</p>
        <textarea v-model="newProduct.description" placeholder="description (optional)" class="border p-2 rounded w-full"></textarea>
        
        <p class="font-bold">Price :</p>
        <input v-model="newProduct.price" type="number" placeholder="price" class="border p-2 rounded w-full" required />
        
        <!-- CATEGORY -->
        <div class="flex gap-2">
            <p class="font-bold">Category :</p> 
        </div>
        <select v-model="newProduct.category_id" class="border p-2 rounded w-full" required>
            <!-- <li v-for="category in categories" :key="category.id" :value="category.id"> -->
                <option value="" disabled selected>select a category</option>
                <option v-for="cate in categories" :key="cate.id" :value="cate.id">
                    {{ cate.name }}
                </option>
            <!-- </li> -->
        </select>
        <div class="mt-2">
            <input v-model="newCategory" type="text" placeholder="add new category name" class="border p-2 rounded w-full" />
            <button @click.prevent="createCategory" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Category</button>
        </div>
        
        <!-- BRAND -->
        <p class="font-bold">Brand :</p>
        <select v-model="newProduct.brand_id" placeholder="brand" class="border p-2 rounded w-full" required>
            <li v-for="brand in brands" :key="brand.id" :value="brand.id">
                <option value="" disabled selected>select a brand</option>
                <option v-for="b in brand" :key="b.id" :value="b.id">
                    {{ b.name }}
                </option>   
            </li>
        </select>
        <div class="mt-2">
            <input v-model="newBrand" type="text" placeholder="add new brand name" class="border p-2 rounded w-full" />
            <button @click.prevent="createBrand" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Brand</button>
        </div>

        <div v-if="selectedFiles.length > 0" class="mt-4">
            <p class="mb-2">Preview Images:</p>
            <div class="flex gap-10">
                <div v-for="(file, index) in selectedFiles" :key="index" class="w-24 h-24">
                    <img :src="file" alt="Selected Image Preview" class="w-full h-full object-cover rounded-md" />
                </div>
            </div>
        </div>

        <p class="font-bold">Privacy :</p>
        <select v-model="newProduct.accessibility" class="border p-2 rounded w-full">
            <option value="PUBLIC">public</option>
            <option value="PRIVATE">private</option>
        </select>

        <button type="submit" class="bg-green-500 text-white p-2 rounded w-full">Add Product</button>
    </form>

        <Report 
            :show="showSuccessCreateProduct" 
            title="Create Product Completed" 
            buttonText="Got it!" 
            @close="showSuccessCreateProduct = false" 
        />
        <Report 
            :show="showSuccessCreateCategory" 
            title="Create Category Completed" 
            buttonText="Got it!" 
            @close="showSuccessCreateCategory = false" 
        />
        <Report 
            :show="showSuccessCreateBrand" 
            title="Create Brand Completed" 
            buttonText="Got it!" 
            @close="showSuccessCreateBrand = false" 
        />
</template>

<style lang="scss" scoped>
</style>