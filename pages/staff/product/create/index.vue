<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import ReportSuccess from '@/components/staff/modals/ReportSuccess.vue';
    import ReportFailed from '@/components/staff/modals/ReportFailed.vue';
    

    definePageMeta({ layout: 'staff' });

    const showSuccessCreateProduct = ref(false);
    const showSuccessCreateCategory = ref(false);
    const showSuccessCreateBrand = ref(false);

    const loading = ref(false);
    const categories = ref([]);
    const newCategory = ref('')
    const brands = ref([])
    const newBrand = ref('')

    const errorMessage = ref('');
    const categoryErrorMessage = ref('');
    const brandErrorMessage = ref('');

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
    const useRoute = useRouter()

    const API_BASE = 'http://localhost/api/products';
    const CATEGORY_API_BASE = 'http://localhost/api/categories';
    const BRAND_API_BASE = 'http://localhost/api/brands';
    const IMAGE_UPLOAD_API = 'http://localhost/api/products/images';

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
            brands.value = response.data.data;
        } catch (error) {
            console.error('Brand Fetch Error:', error.message);
            errorMessage.value = 'Failed to fetch brands.';
        }
    };

    const createCategory = async () => { 
        if (!newCategory.value.trim()) {
            categoryErrorMessage.value = 'Please enter a category name.';
            return;
        }

        try {
            const response = await axios.post(CATEGORY_API_BASE, { name: newCategory.value });

            if (response.status === 201 || response.status === 200) {
                showSuccessCreateCategory.value = true;
                categories.value.push(response.data.category);
                newCategory.value = '';
                categoryErrorMessage.value = '';
            } else {
                categoryErrorMessage.value = response.data.message || 'Unexpected response.';
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    categoryErrorMessage.value = 'Validation failed: Category name might already exist.';
                } else {
                    categoryErrorMessage.value = error.response.data.message || 'Failed to create category.';
                }
            } else {
                categoryErrorMessage.value = 'Network error or server is down.';
            }
            console.error('Create Category Error:', error);
        }
    };

    const createBrand = async () => {
        if (!newBrand.value.trim()) {
            brandErrorMessage.value = 'Please enter a brand name.';
            return;
        }

        try {
            const response = await axios.post(BRAND_API_BASE, { name: newBrand.value });

            if (response.status === 201 || response.status === 200) { 
                showSuccessCreateBrand.value = true;
                brands.value.push(response.data.brand);
                newBrand.value = '';
                brandErrorMessage.value = ''; 
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    brandErrorMessage.value = 'Validation failed: Brand name might already exist.';
                } else if (error.response.status === 404) {
                    brandErrorMessage.value = 'Brand not found.';
                } else {
                    brandErrorMessage.value = error.response.data.message || 'An error occurred.';
                }
            } else {
                brandErrorMessage.value = 'Network error. Please try again later.';
            }
        }
    };

    const uploadImage = async (productId, imageFile) => {
        const formData = new FormData();
        formData.append('image_file', imageFile);
        formData.append('product_id', productId);

        try {
            const response = await axios.post(IMAGE_UPLOAD_API, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            return response.data.data;
        } catch (error) {
            console.error('Image Upload Error:', error.message);
            errorMessage.value = 'Failed to upload image.';
            return null;
        }
    };

    const createProduct = async () => {
        errorMessage.value = ''; // Reset error messages

        if (!newProduct.value.name.trim() || !newProduct.value.price) {
            errorMessage.value = 'Please fill in required fields.';
            return;
        }

        try {
            const response = await axios.post(API_BASE, newProduct.value);
            if (response.status === 201) {
                const productId = response.data.data.id;

                for (let i = 0; i < selectedFiles.value.length; i++) {
                    const uploadedImage = await uploadImage(productId, selectedFiles.value[i]);
                    if (uploadedImage) {
                        newProduct.value.image_products.push(uploadedImage);
                    }
                }

                await axios.put(`${API_BASE}/${productId}`, newProduct.value);

                showSuccessCreateProduct.value = true;
                useRoute.push("/staff/product");
            } else {
                errorMessage.value = response.data.message || 'Failed to create product.';
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    // Handle validation errors
                    const validationErrors = error.response.data.errors;
                    if (validationErrors) {
                        errorMessage.value = Object.values(validationErrors).flat().join(' ');
                    } else {
                        errorMessage.value = 'Validation failed.';
                    }
                } else if (error.response.status === 404) {
                    errorMessage.value = 'Product not found.';
                } else {
                    errorMessage.value = error.response.data.message || 'An error occurred.';
                }
            } else {
                errorMessage.value = 'Network error. Please try again later.';
            }
        }
    };

    onMounted(() => {
        fetchCategories();
        fetchBrands();
    });
</script>

<template>
    <div class="mt-10 mx-16">
        <h1 class="text-2xl font-bold mb-4">Create Product</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

        <div class="bg-white p-4 shadow-md rounded w-2/3">
            <form @submit.prevent="createProduct">
                <!-- NAME -->
                 <div class="mb-4">
                    <label for="name" class="block text-sm font-semibold">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        v-model="newProduct.name"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <!-- DESCRIPTION -->
                <div class="mb-4">
                    <label for="description" class="block text-sm font-semibold">Description</label>
                    <textarea
                        id="description"
                        v-model="newProduct.description"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter product description"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div class="mb-4 flex gap-4">
                    <!-- PRICE -->
                    <div class="w-1/2">
                        <label for="price" class="block text-sm font-semibold">Price</label>
                        <input
                        type="number"
                        id="price"
                        v-model="newProduct.price"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter product price"
                        required
                        />
                    </div>

                    <!-- STOCK -->
                    <!-- <div class="w-1/2">
                        <label for="stock" class="block text-sm font-semibold">Stock</label>
                        <input
                        type="number"
                        id="stock"
                        v-model="newProduct.stock"
                        class="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter stock quantity"
                        required
                        />
                    </div> -->
                </div>

                <!-- CATEGORY -->
                <div class="mb-4">
                    <label for="category_id" class="block text-sm font-semibold">Category</label>
                    <select
                        id="category_id"
                        v-model="newProduct.category_id"
                        class="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                        </option>
                    </select>

                    <div class="mt-2">
                        <input v-model="newCategory" type="text" placeholder="add new category name" class="border p-2 rounded w-full" />
                        <p v-if="categoryErrorMessage" class="text-red-500 text-sm mt-1">{{ categoryErrorMessage }}</p>
                        <button @click.prevent="createCategory" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Category</button>
                    </div>
                </div>

                <!-- BRAND -->
                <div class="mb-4">
                    <label for="brand_id" class="block text-sm font-semibold">Brand</label>
                    <select
                        id="brand_id"
                        v-model="newProduct.brand_id"
                        class="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                        {{ brand.name }}
                        </option>
                    </select>

                    <div class="mt-2">
                        <input v-model="newBrand" type="text" placeholder="add new brand name" class="border p-2 rounded w-full" />
                        <p v-if="brandErrorMessage" class="text-red-500 text-sm mt-1">{{ brandErrorMessage }}</p>
                        <button @click.prevent="createBrand" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Brand</button>
                    </div>
                </div>

                <!-- ACCESSIBILITY -->
                <!-- <div class="mb-4">
                    <label for="accessibility" class="block text-sm font-semibold">Accessibility</label>
                    <select
                        id="accessibility"
                        v-model="newProduct.accessibility"
                        class="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                </div> -->

                <!-- <div class="mb-4">
                    <label for="image_products" class="block text-sm font-semibold">Product Images</label>
                    <input
                        type="file"
                        id="image_products"
                        @change="selectedFiles = $event.target.files"
                        multiple
                        class="w-full p-2 border border-gray-300 rounded"
                    />
                </div> -->

                <div class="flex gap-4 justify-end">
                    <button
                        type="submit"
                        class="text-white px-6 py-2 rounded bg-blue-400 hover:bg-blue-700"
                        :disabled="loading"
                    >
                        {{ loading ? 'Creating...' : 'Create Product' }}
                    </button>
                </div>
            </form>
        </div>

        <ReportSuccess 
            :show="showSuccessCreateProduct" 
            title="Create Product Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessCreateProduct = false" 
        />
        <ReportSuccess 
            :show="showSuccessCreateCategory" 
            title="Create Category Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessCreateCategory = false" 
        />
        <ReportSuccess 
            :show="showSuccessCreateBrand" 
            title="Create Brand Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessCreateBrand = false" 
        />
    </div>
</template>

<style lang="scss" scoped>
</style>