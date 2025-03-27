<template>
    <div class="p-10">
        <div class="flex justify-between">
            <strong class="text-xl font-semibold align-baseline">All Products</strong>
            <Searchbar></Searchbar>
        </div>

        <div class="flex">

            <div>
                <customerSidebar></customerSidebar>
            </div>

           <div class="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-10">
            <div 
            
                class="card card-compact bg-base-100 shadow-xl p-4 rounded-lg" 
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
                            <div class="card-actions">
                                <button class="btn btn-primary text-[10px] rounded-[30px] ">Add to Cart</button>
                            </div>
                        </div>

                    </div>

                </NuxtLink>
            </div>
            <!-- <Pagination class="absolute inset-x-0 bottom-10 mt-10 h-1"></Pagination> -->
            </div> 

            
        </div>
        

        
    </div>
</template>


<script setup>
import axios from 'axios';

const products = ref([])

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

watchEffect(() => {
  fetchProducts();
}, { flush: 'post' });

// onMounted(fetchProducts)

</script>