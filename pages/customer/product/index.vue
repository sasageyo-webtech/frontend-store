<script setup>

const  { $swal } = useNuxtApp()

const products = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const pagination = ref({ last_page: 1 });
const isSearching = ref(false);

const fetchProducts = async () => {
  products.value = [];
  pagination.value = { last_page: 1 };

  const { category_id, brand_id } = useRoute().query;

    // แสดง SweetAlert กำลังโหลด
    $swal.fire({
        title: 'Product is loading...',
        text: 'wait a minute....',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            $swal.showLoading();
        },
    });
  try {
    let url = '/products';
    if (category_id) url += `/categories/${category_id}`;
    if (brand_id) url += `/brands/${brand_id}`;

    const response = await apiClient.get(url, {
      params: { page: currentPage.value }
    });

    products.value = response.data.data;
    pagination.value = response.data.meta;
    isSearching.value = false;

    // หน่วงเวลา 1 วินาทีก่อนปิด SweetAlert
    await new Promise(resolve => setTimeout(resolve, 500));
    $swal.close();

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const searchProducts = async () => {
  products.value = [];
  pagination.value = { last_page: 1 };

  if (!searchQuery.value) {
    fetchProducts();
    return;
  }

   // แสดง SweetAlert กำลังโหลด
   $swal.fire({
        title: 'Product is loading...',
        text: 'wait a minute....',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            $swal.showLoading();
        },
    });

  try {
    const response = await apiClient.get('/products/search', {
      params: { query: searchQuery.value, page: currentPage.value }
    });

    products.value = response.data.data;
    pagination.value = response.data.meta;
    isSearching.value = true;

        // หน่วงเวลา 1 วินาทีก่อนปิด SweetAlert
    await new Promise(resolve => setTimeout(resolve, 300));
    $swal.close();

  } catch (error) {
    console.error('Error searching products:', error);
  }
};

// เปลี่ยนหน้า
const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    currentPage.value = page;
  }
};

// อัพเดตข้อมูลเมื่อ searchQuery หรือ currentPage เปลี่ยน
watchEffect(() => {
  if (searchQuery.value) {
    searchProducts();
  } else {
    fetchProducts();
  }
});

// คำนวณปุ่ม Pagination
const visiblePages = computed(() => {
  const totalPages = pagination.value.last_page || 1;
  const current = currentPage.value;
  const range = 2;
  let pages = [];

  if (totalPages > 1) pages.push(1);
  if (current > range + 2) pages.push('...');

  for (let i = Math.max(2, current - range); i <= Math.min(totalPages - 1, current + range); i++) {
    pages.push(i);
  }

  if (current < totalPages - range - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
});
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
              </div>
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
          </NuxtLink>
        </div>
      </div> 
  
      <!-- Pagination -->
      <div class="flex justify-center space-x-2 mt-4">
        <button v-if="currentPage > 1" :disabled="currentPage === 1" @click="goToPage(1)" class="px-4 py-2 border rounded bg-gray-200">« First</button>
        <button v-if="currentPage > 1" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" class="px-4 py-2 border rounded bg-gray-200">‹ Prev</button>
  
        <button v-for="page in visiblePages" :key="page"
          :disabled="page === '...' || page === currentPage"
          @click="goToPage(Number(page))"
          class="px-4 py-2 border rounded"
          :class="{'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage}">
          {{ page }}
        </button>
  
        <button v-if="currentPage < pagination.last_page" :disabled="currentPage === pagination.last_page" @click="goToPage(currentPage + 1)" class="px-4 py-2 border rounded bg-gray-200">Next ›</button>
        <button v-if="currentPage < pagination.last_page" :disabled="currentPage === pagination.last_page" @click="goToPage(pagination.last_page)" class="px-4 py-2 border rounded bg-gray-200">Last »</button>
      </div>
    </div>
  </template>
