<script setup>

const products = ref([])
const searchQuery = ref('')

useHead({
    title: "All product",
    meta: [
        { name: "description" , content: "online store, skincare, medicine"}
    ]
})

const fetchProducts = async () => {
  const { category_id, brand_id } = useRoute().query;
  try {
    let url = '/products';
    if (category_id) {
      url += `/categories/${category_id}`;
    }
    if (brand_id) {
        url += `/brands/${brand_id}`;
    }
    const response = await apiClient.get(url);
    products.value = response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const searchProducts = async () => {
    if (!searchQuery.value) {
        fetchProducts(); // โหลดสินค้าปกติถ้าช่องค้นหาว่าง
        return;
    }

    try {
        const response = await apiClient.get('/products/search', {
            params: { query: searchQuery.value }
        });
        products.value = response.data.data;
    } catch (error) {
        console.error('Error searching products:', error);
    }
};

watchEffect(() => {
  fetchProducts();
  
}, { flush: 'post' });

// onMounted(fetchProducts)

</script>




<template>
    <div class="p-10">
        <div class="flex justify-between">
            <strong class="text-xl font-semibold align-baseline">All Products</strong>
            <input 
                v-model="searchQuery" 
                @input="searchProducts"
                placeholder="Search products..." 
                class="input input-bordered w-60"
            />
        </div>

        <div class="">
           <div class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-10">
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
                            <!-- <div class="card-actions">
                                <button class="btn btn-primary text-[10px] rounded-[30px] ">Add to Cart</button>
                            </div> -->
                        </div>

                    </div>

                </NuxtLink>
            </div>
            <!-- <Pagination class="absolute inset-x-0 bottom-10 mt-10 h-1"></Pagination> -->
            </div> 

            
        </div>
        

        
    </div>
</template>
