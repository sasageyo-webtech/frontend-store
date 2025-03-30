<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import Report from '@/components/staff/modals/Report.vue';

    definePageMeta({
        layout: 'staff',
    });

    const showSuccessUploadImage = ref(false);
    const showSuccessCreateCategory = ref(false);
    const showSuccessCreateBrand = ref(false);
    const showSuccessUpdateProduct = ref(false);
    const showSuccessDeleteProduct = ref(false);

    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = 10;

    const products = ref([])
    const categories = ref([])
    const newCategory = ref('')
    const brands = ref([])
    const newBrand = ref('')

    const selectedFiles = ref([])
    const selectedProduct = ref(null);

    const loading = ref(false)
    const errorMessage = ref('')

    const API_BASE = 'http://localhost/api/products'
    const CATEGORY_API_BASE = 'http://localhost/api/categories'
    const BRAND_API_BASE = 'http://localhost/api/brands'
    const IMAGE_UPLOAD_API = 'http://localhost/api/products/images';

    const fetchProducts = async (page = 1) => {
        loading.value = true;
        errorMessage.value = '';

        try {
            const response = await axios.get(API_BASE, {
                params: { page, limit: itemsPerPage }
            });

            if (response.data.data) {
                products.value = response.data.data.data
                totalPages.value = Math.ceil(response.data.total / itemsPerPage);
            } else {
                errorMessage.value = 'Invalid data format.';
                products.value = [];
            }
        } catch (error) {
            errorMessage.value = error.message;
            products.value = [];
        } finally {
            loading.value = false;
        }
    };

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            currentPage.value = newPage;
            fetchProducts(newPage);
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
            const response = await axios.get(BRAND_API_BASE)
            brands.value = response.data.data
        } catch (error) {
            console.error('Category Fetch Error:', error.message)
            errorMessage.value = 'Failed to fetch brands.'
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

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('product_id', selectedProduct.value.id)
        formData.append('image_file', selectedFiles.value[0]);

        try {
            const response = await axios.post(IMAGE_UPLOAD_API, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                showSuccessUploadImage.value = true;
            }
        } catch (error) {
            console.error('Image Upload Error:', error.message);
        }
    };

    // const handleImageUpload = (event) => {
    //     selectedFiles.value = Array.from(event.target.files).map(file => {
    //         return URL.createObjectURL(file);
    //     });
    // };    

    const handleImageUpload = (event) => {
        selectedFiles.value = Array.from(event.target.files);
    }

    const selectProduct = (product) => {
        selectedProduct.value = { ...product };
    };


    const updateProduct = async () => {
        if (!selectedProduct.value) return;

        try {
            const response = await axios.put(`${API_BASE}/${selectedProduct.value.id}`, selectedProduct.value);

            if (response.status === 200) {
                showSuccessUpdateProduct.value = true;
                fetchProducts();
                selectedProduct.value = null;
            } else {
                errorMessage.value = 'Failed to update product.';
            }
        } catch (error) {
            console.error('Update Error:', error.message);
            errorMessage.value = error.message;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE}/${id}`);
            if (response.status === 200) {
                showSuccessDeleteProduct.value = true;
                products.value = products.value.filter(p => p.id !== id);
                if (selectedProduct.value && selectedProduct.value.id === id) {
                    selectedProduct.value = null;
                }
            } else {
                errorMessage.value = 'Failed to delete product.';
            }
        } catch (error) {
            console.error('Delete Error:', error.message);
            errorMessage.value = error.message;
        }
    };

    onMounted(() => {
        fetchProducts()
        fetchCategories()
        fetchBrands()        
    })
</script>

<template>
    <div class="mt-10 mx-16 flex gap-10">
        <div class="w-1/3">
            <h1 class="text-2xl font-bold mb-4">Product List</h1>

            <!-- <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div> -->

            <div v-if="loading" class="text-gray-500">Loading products...</div>
            <ul v-else> 
                <li :key="index" v-for="(prod, index) in products" 
                    @click="selectProduct(prod)" 
                    class="flex justify-between hover:bg-gray-200 items-center my-2 p-2 px-3 border border-[rgba(0,0,0,0.1)] shadow-xl rounded">
                    <div class="flex items-center">
                        <img :src="prod.image_products?.[0]?.image_path || 'default-image.jpg'" alt="Product Image" class="w-16 h-16 object-cover mr-4 rounded" />
                        <div>
                            <span class="font-bold">{{ prod.name }}</span> : ${{ prod.price }} (Stock: {{ prod.stock }})
                        </div>
                    </div>

                    <div class="flex gap-6">
                        <button @click="deleteProduct(prod.id)" class="bg-red-500 text-white p-1 px-4 rounded">Delete</button>
                    </div>
                </li>
            </ul>

            <!-- PAGINATION -->
            <div class="flex justify-center mt-4 space-x-2">
                <button @click="changePage(currentPage - 1)" class="px-4 py-2 bg-gray-300 hover:bg-gray-700 hover:text-white rounded border border-[rgba(0,0,0,0.1)]">
                    Prev
                </button>

                <span class="px-4 py-2" >{{ currentPage }} / {{ totalPages }}</span>

                <button @click="changePage(currentPage + 1)" class="px-4 py-2 bg-gray-300 hover:bg-gray-700 hover:text-white rounded border border-[rgba(0,0,0,0.1)]">
                    Next
                </button>
            </div>
        </div>
        
        <div v-if="selectedProduct" class="w-1/2.5 p-6 mt-12 border border-gray-300 rounded shadow-md">
            <h2 class="text-xl font-bold mb-4">Edit Product</h2>
            
            <div class="p-4 space-y-2">
                <!-- PICTURE -->
                <p class="font-bold">Picture :</p>
                <div class="flex justify-between items-center gap-10">
                    <div class="relative border border-black border-1 rounded-md p-2 pt-3 w-    ">
                        <input type="file" multiple @change="handleImageUpload" id="image-upload"/>
                        <label for="image-upload" class="py-2 px-5 bg-blue-400 hover:bg-blue-700 text-white text-sm rounded-lg text-lg ">
                            Choose Image(s)
                        </label>    
                    </div>

                    <!-- <div v-if="selectedFiles.length > 0" class="mt-4">
                        <p class="mb-2">Preview Images:</p>
                        <div class="flex gap-10">
                            <div v-for="(file, index) in selectedFiles" :key="index" class="w-24 h-24">
                                <img :src="file" alt="Selected Image Preview" class="w-full h-full object-cover rounded-md" />
                            </div>
                        </div>
                    </div> -->

                    <button @click="uploadImage" class="bg-blue-400 hover:bg-blue-700 text-white p-3 rounded w-fit">Save Image</button>
                </div>

                <!-- NAME -->
                <p class="font-bold">Product name :</p>
                <input v-model="selectedProduct.name" type="text" class="border p-2 rounded w-full" required />
                
                <!-- DESCRIPTION -->
                <p class="font-bold">Description :</p>
                <textarea v-model="selectedProduct.description" class="border p-2 rounded w-full"></textarea>
                
                <!-- PRICE -->
                <p class="font-bold">Price :</p>
                <input v-model="selectedProduct.price" type="number" class="border p-2 rounded w-full" required />
                
                <!-- CATEGORY -->
                <div class="flex gap-2">
                    <p class="font-bold">Category :</p> 
                    <p> {{ selectedProduct.category.name }}</p>
                </div>
                <select v-model="selectedProduct.category_id" class="border p-2 rounded w-full" required>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <div class="mt-2">
                    <input v-model="newCategory" type="text" placeholder="add new category name" class="border p-2 rounded w-full" />
                    <button @click.prevent="createCategory" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Category</button>
                </div>

                <!-- BRAND -->
                <div class="flex gap-2">
                    <p class="font-bold">Brand :</p>
                    <p> {{ selectedProduct.brand.name }}</p>
                </div>
                <select v-model="selectedProduct.brand_id" placeholder="brand" class="border p-2 rounded w-full" required>
                    <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                        {{ brand.name }}
                    </option>   
                </select>
                <div class="mt-2">
                    <input v-model="newBrand" type="text" placeholder="add new brand name" class="border p-2 rounded w-full" />
                    <button @click.prevent="createBrand" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Brand</button>
                </div>

                <!-- ACCESSIBILITY -->
                <p class="font-bold">Privacy :</p>
                <select v-model="selectedProduct.accessibility" class="border p-2 rounded w-full">
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                </select>
            </div>

            <button @click="updateProduct" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-4">Save Changes</button>
        </div>

        <Report 
            :show="showSuccessUploadImage" 
            title="Upload Completed" 
            buttonText="Got it!" 
            @close="showSuccessUploadImage = false" 
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
        <Report 
            :show="showSuccessUpdateProduct" 
            title="Update Product Completed" 
            buttonText="Got it!" 
            @close="showSuccessUpdateProduct = false" 
        />
        <Report 
            :show="showSuccessDeleteProduct" 
            title="Delete Product Completed" 
            buttonText="Got it!" 
            @close="showSuccessDeleteProduct = false" 
        />
    </div>
</template>

<style lang="scss" scoped>
</style>
