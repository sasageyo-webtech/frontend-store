<script setup>
    import { ref, computed, onMounted } from 'vue';
    import axios from 'axios';
    import ReportSuccess from '@/components/staff/modals/ReportSuccess.vue';
    import ReportFailed from '@/components/staff/modals/ReportFailed.vue';

    definePageMeta({
        layout: 'staff',
    });

    const searchQuery = ref('');

    const showSuccessUploadImage = ref(false);
    const showSuccessDeleteImage = ref(false);
    const showSuccessCreateCategory = ref(false);
    const showSuccessCreateBrand = ref(false);
    const showSuccessUpdateProduct = ref(false);
    const showSuccessDeleteProduct = ref(false);
    const showSuccessAddStock = ref(false);

    const showFailAddStockQuantity = ref(false);

    const showStockModal = ref(false);

    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = 20;

    const products = ref([])
    const stockInput = ref(null);
    const selectedProductForStock = ref(null);
    const categories = ref([])
    const newCategory = ref('')
    const brands = ref([])
    const newBrand = ref('')

    const selectedFiles = ref([])
    const selectedProduct = ref(null);

    const loading = ref(false)
    const errorMessage = ref('')
    const categoryErrorMessage = ref('');
    const brandErrorMessage = ref('');

    const API_BASE = 'http://localhost/api/products'
    const CATEGORY_API_BASE = 'http://localhost/api/categories'
    const BRAND_API_BASE = 'http://localhost/api/brands'
    const IMAGE_UPLOAD_API = 'http://localhost/api/products/images';

    const fetchProducts = async (page = 1) => {
        loading.value = true;
        errorMessage.value = '';

        try {
            const response = await axios.get(API_BASE, {
                params: {
                    page,
                    limit: itemsPerPage,
                    search: searchQuery.value,
                }
            });

            if (response.data) {
                products.value = response.data.data;
                totalPages.value = Math.ceil(response.data.meta.total / itemsPerPage);
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

    const filteredProducts = computed(() => {
        return products.value.filter((product) => {
            const matchesName = product.name.toLowerCase().startsWith(searchQuery.value.toLowerCase());
            return matchesName;
        });
    });

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            currentPage.value = newPage;
            fetchProducts(newPage);
        }
    };

    const fetchCategories = async () => {
        console.log("TEST : ", )
        try {
            console.log("TEST 2 : ", )
            const response = await axios.get(CATEGORY_API_BASE);
            console.log("TEST 3 : ", )
            categories.value = response.data.data;
            console.log("Category : ",  response.data.data)
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
            categoryErrorMessage.value = 'Please enter a category name.';
            return;
        }

        if (categories.value.some(category => category.name.toLowerCase() === newCategory.value.trim().toLowerCase())) {
            categoryErrorMessage.value = 'Category name already exists.';
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

        if (brands.value.some(brand => brand.name.toLowerCase() === newBrand.value.trim().toLowerCase())) {
            brandErrorMessage.value = 'Brand name already exists.';
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

    const uploadImage = async () => {
        if (!selectedProduct.value || selectedFiles.value.length === 0) {
            errorMessage.value = 'Please select a product and an image.';
            return;
        }

        const formData = new FormData();
        formData.append('product_id', selectedProduct.value.id);
        formData.append('image_file', selectedFiles.value[0]);

        try {
            const response = await axios.post(IMAGE_UPLOAD_API, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                showSuccessUploadImage.value = true;
                fetchProducts(); // Refresh product list with new image
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errorMessage.value = 'Validation failed: Ensure the file is a valid image.';
            } else {
                errorMessage.value = 'Image upload failed. Try again.';
            }
        }
    };

    const deleteImage = async (imageId) => {
        try {
            const response = await axios.delete(`http://localhost/api/products/images/${imageId}`);

            if (response.status === 200) {
                showSuccessDeleteImage.value = true;
                selectedProduct.value.image_products = selectedProduct.value.image_products.filter(img => img.id !== imageId);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                errorMessage.value = 'Image not found or already deleted.';
            } else {
                errorMessage.value = error.message;
            }
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

        const duplicate = products.value.find(
            (prod) => prod.name.trim().toLowerCase() === selectedProduct.value.name.trim().toLowerCase() && prod.id !== selectedProduct.value.id
        );

        if (duplicate) {
            errorMessage.value = 'Product name already exists. Please choose a different name.';
            return;
        }

        if (selectedProduct.value.price < 0) {
            errorMessage.value = "Price cannot be negative.";
            return;
        }

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

    const addStock = async () => {
        if (!selectedProductForStock.value || stockInput.value < 0) {
            showFailAddStockQuantity.value = true;
            return;
        }

        try {
            const response = await axios.patch(`http://localhost/api/products/${selectedProductForStock.value.id}/add-stock`, {
                amount: stockInput.value
            });

            if (response.status === 200) {
                showSuccessAddStock.value = true;
                selectedProductForStock.value.stock = stockInput.value;
                showStockModal.value = false;
            }
        } catch (error) {
            console.error('Stock Update Error:', error.message);
            alert('Failed to update stock.');
        }   
    };

    const openStockModal = (product) => {
        selectedProductForStock.value = product;
        stockInput.value = 0;
        showStockModal.value = true;
    };
    
    watch([searchQuery], () => {
        fetchProducts();
    });

    onMounted(() => {
        fetchProducts()
        fetchCategories()
        fetchBrands()        
    })
</script>

<template>
    <div class="mt-10 mx-16 flex gap-10">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold mb-4">Edit Product List</h1>

            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

            <!-- Search Filter -->
            <div class="mb-4">
                <input v-model="searchQuery" type="text" placeholder="Search by product name..." 
                class="border p-2 rounded w-full mb-2" />
            </div>

            <div v-if="loading" class="text-gray-500">Loading products...</div>
            <ul v-else> 
                <li :key="index" v-for="(prod, index) in filteredProducts" 
                    @click="selectProduct(prod)" 
                    class="flex justify-between hover:bg-gray-200 items-center my-2 p-2 px-3 border border-[rgba(0,0,0,0.1)] shadow-xl rounded">
                    
                    <div class="flex items-center">
                        <img :src="prod.image_products?.[0]?.image_path || 'default-image.jpg'" 
                            alt="Product Image" 
                            class="w-16 h-16 object-cover mr-4 rounded" />
                        <div>
                            <span class="font-bold">{{ prod.name }}</span> : ${{ prod.price }} (Stock: {{ prod.stock }})
                        </div>
                    </div>

                    <div class="flex gap-6">
                        <button @click.stop="deleteProduct(prod.id)" class="bg-red-400 hover:bg-red-600 text-white p-1 px-4 rounded">
                            Delete
                        </button>
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
        
        <div v-if="selectedProduct" class="w-1/2 p-6 mt-12 border border-gray-300 rounded shadow-md">
            <div class="flex justify-between">
                <h2 class="text-xl font-bold mb-4">Edit Product</h2>
            
                <button @click="openStockModal(selectedProduct)" 
                        class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded">
                    Edit Stock
                </button>    
            </div>
            
            <div class="p-4 space-y-2">
                <!-- PICTURE -->
                <p class="font-bold">Picture :</p>
                <div v-if="selectedProduct.image_products?.length > 0" class="mt-4">
                    <p class="mb-2">Preview Images:</p>
                    <div class="flex gap-4 mb-3">
                        <div v-for="(pic, index) in selectedProduct.image_products" :key="index" class="relative w-24 h-24 border shadow-xl rounded-md">
                            <img :src="pic.image_path" alt="Selected Image Preview" class="w-full h-full object-cover rounded-md" />
                            <button @click="deleteImage(pic.image_id)" class="absolute top-0 right-0 bg-red-500 text-white px-2 text-sm rounded">
                                X
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-5">
                    <div class="relative border border-black border-1 rounded-md p-3 pt-4">
                        <input type="file" multiple @change="handleImageUpload" id="image-upload"/>
                        <label for="image-upload" class="py-2 px-5 bg-blue-400 hover:bg-blue-700 text-white text-sm rounded-lg text-lg ">
                            Choose Image(s)
                        </label>    
                    </div>



                    <button @click="uploadImage" class="bg-blue-400 hover:bg-blue-700 text-white p-3 rounded w-fit">Save Image</button>
                </div>

                <!-- NAME -->
                <p class="font-bold">Product name :</p>
                <input v-model="selectedProduct.name" type="text" class="border p-2 rounded w-full" required />
                
                <!-- DESCRIPTION -->
                <p class="font-bold">Description :</p>
                <textarea 
                    v-model="selectedProduct.description" 
                    class="border p-2 rounded w-full" 
                    :rows="selectedProduct.description.length > 0 ? Math.min(selectedProduct.description.split('\n').length + 3, 10) : 3"
                    placeholder="Enter description here...">
                </textarea>
                
                <!-- PRICE -->
                <p class="font-bold">Price :</p>
                <input v-model="selectedProduct.price" type="number" class="border p-2 rounded w-full" required />
                
                <!-- CATEGORY -->
                <div class="mb-4">
                    <div class="mb-1">
                        <label for="category_id" class="font-bold">Category :</label>
                        {{ selectedProduct.category.name }}
                    </div>
                    <select
                        id="category_id"
                        v-model="selectedProduct.category_id"
                        class="w-full p-2 border rounded"
                        required
                    >
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                        </option>
                    </select>

                    <div class="mt-2">
                        <input v-model="newCategory" type="text" placeholder="add new category name" class="border border-gray-300 p-2 rounded w-full" />
                        <p v-if="categoryErrorMessage" class="text-red-500 text-sm mt-1">{{ categoryErrorMessage }}</p>
                        <button @click.prevent="createCategory" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Category</button>
                    </div>
                </div>

                <!-- BRAND -->
                <div class="mb-4">
                    <div class="mb-1">
                        <label for="brand_id" class="font-bold">Brand :</label>
                        {{ selectedProduct.brand.name }}
                    </div>
                    <select
                        id="brand_id"
                        v-model="selectedProduct.brand_id"
                        class="w-full p-2 border rounded"
                        required
                    >
                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                        {{ brand.name }}
                        </option>
                    </select>

                    <div class="mt-2">
                        <input v-model="newBrand" type="text" placeholder="add new brand name" class="border border-gray-300 p-2 rounded w-full" />
                        <p v-if="brandErrorMessage" class="text-red-500 text-sm mt-1">{{ brandErrorMessage }}</p>
                        <button @click.prevent="createBrand" class="bg-blue-400 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Create New Brand</button>
                    </div>
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


        <div v-if="showStockModal">
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white p-6 rounded shadow-md w-96">
                    <h2 class="text-lg font-bold mb-4">Update Stock</h2>
                    
                    <label class="block mb-2 font-semibold">Amount quantity to add:</label>
                    <input type="number" v-model="stockInput" min="0"
                        class="border p-2 rounded w-full" />

                    <div class="flex justify-end mt-4 space-x-2">
                        <button @click="showStockModal = false"
                                class="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded">
                            Cancel
                        </button>

                        <button @click="addStock"
                                class="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <ReportSuccess 
            :show="showSuccessUploadImage" 
            title="Upload Image Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessUploadImage = false" 
        />
        <ReportSuccess 
            :show="showSuccessDeleteImage" 
            title="Delete Image Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessDeleteImage = false" 
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
        <ReportSuccess 
            :show="showSuccessUpdateProduct" 
            title="Update Product Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessUpdateProduct = false" 
        />
        <ReportSuccess 
            :show="showSuccessDeleteProduct" 
            title="Delete Product Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessDeleteProduct = false" 
        />
        <ReportSuccess 
            :show="showSuccessAddStock" 
            title="Add Stock Completed!!!" 
            buttonText="Got it!" 
            @close="showSuccessAddStock = false" 
        />
        <ReportFailed
            :show="showFailAddStockQuantity" 
            title="Add Stock Failed!!!" 
            buttonText="OK" 
            @close="showFailAddStockQuantity = false" 
        />
    </div>
</template>

<style lang="scss" scoped>
</style>
