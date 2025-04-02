<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    definePageMeta({
        layout: 'staff',
    });

    const router = useRouter();
    const searchQuery = ref('');

    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = 20;

    const products = ref([])
    const categories = ref([])
    const brands = ref([])

    const selectedProduct = ref(null);

    const loading = ref(false)
    const errorMessage = ref('')

    const API_BASE = 'http://localhost/api/products'
    const CATEGORY_API_BASE = 'http://localhost/api/categories'
    const BRAND_API_BASE = 'http://localhost/api/brands'

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
        try {
            const response = await axios.get(CATEGORY_API_BASE);
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

    const selectProduct = (product) => {
        router.push({ path: `/staff/product/${product.id}` });
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
            <h1 class="text-2xl font-bold mb-4">View Product List</h1>

            <!-- <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div> -->

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
    </div>
</template>

<style lang="scss" scoped>
</style>
