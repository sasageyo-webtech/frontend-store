<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUser();
const user = ref({});
const categories = ref([]);
const brands = ref([]);
const carts = ref([]);

const logoutUser = async () => {
  try {
    await apiClient.post('/users/revoke');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    userStore.logout();
    router.push('/auth/login');
  }
};

const loadUser = async () => {
    await userStore.loadUser();
    user.value = userStore.userInfo
}

const fetchCart = async () => {
  if (userStore.isLoggedIn) {
    user.value = userStore.userInfo;
    try {
      const cartsResponse = await apiClient.get(`/carts?customer_id=${userStore.userInfo.customer_id}`);
      carts.value = cartsResponse.data.data;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }
};

onMounted(async () => {
  await loadUser()
  await fetchCart();
  
  try {
    const categoriesResponse = await apiClient.get('/categories');
    categories.value = categoriesResponse.data.data;

    const brandsResponse = await apiClient.get('/brands');
    brands.value = brandsResponse.data.data;
  } catch (error) {
    console.error('Failed to fetch categories and brands:', error);
  }
});
</script>

<template>
  <div class="navbar bg-gray-900 ">
    <!-- Logo -->
    <div class="flex-1">
      <div class="watsons-services py-[10px] rounded-2xl">
        <NuxtLink class="text-xl text-white" to="/"><strong>SAsaGEYO</strong></NuxtLink>
        <div class="flex gap-2">
          <img src="/img/flag.png" alt="Flag">
        </div>
      </div>
    </div>

    <div>
      <!-- Category & Brand -->
      <div class="flex-none pr-16">
        <ul class="menu menu-horizontal px-64 z-[1]">
          <li class="pr-20">
            <details>
              <summary class="text-white">Category</summary>
              <ul class="bg-base-100 rounded-t-none p-4 w-48 shadow-lg z-[50]">
                <li><NuxtLink to="/customer/product">All</NuxtLink></li>
                <li v-for="category in categories" :key="category.id" class="]">
                  <NuxtLink :to="`/customer/product?category_id=${category.id}`">{{ category.name }}</NuxtLink>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary class="text-white">Brand</summary>
              <ul class="bg-base-100 rounded-t-none p-4 w-48 shadow-lg z-[50]">
                <li><NuxtLink to="/customer/product">All</NuxtLink></li>
                <li v-for="brand in brands" :key="brand.id">
                  <NuxtLink :to="`/customer/product?brand_id=${brand.id}`">{{ brand.name }}</NuxtLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
    

    <!-- Cart & User Section -->
    <div class="flex-none pr-7 ml-auto flex items-center gap-4">
      <!-- Cart Icon -->
      <div v-if="userStore.isLoggedIn" class="dropdown dropdown-end ">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-5 w-5 text-white" fill="none" stroke="currentColor">
              <path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            <span v-if="carts.length > 0" class="badge badge-sm indicator-item">{{ carts.length }}</span>
          </div>
        </div>
        <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-96 shadow ">
          <div class="card-body">
            <div v-for="(cart, index) in carts" :key="index" class="flex justify-between items-center space-y-2">
              <span class="text-md font-bold">{{ cart.product.name }}</span>
              <span class="text-info">{{ cart.quantity }} pcs</span>
            </div>
            <NuxtLink to="/customer/cart" class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- User Avatar / Login Button -->
      <div class="dropdown dropdown-end">
        <div v-if="userStore.isLoggedIn" tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="User Avatar" :src="user.image_path" />  
          </div>
        </div>

        <ul v-if="userStore.isLoggedIn" tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-5 shadow space-y-4">
          <li><NuxtLink to="/customer/profile">Profile</NuxtLink></li>
          <li><NuxtLink to="/customer/order">My Orders</NuxtLink></li>
          <li><NuxtLink to="/customer/address/">My Address</NuxtLink></li>
          <li><button @click="logoutUser" class="btn  btn-secondary btn-sm text-white px-4  rounded">Logout</button></li>
        </ul>
        <!-- Show Login Button if Not Logged In -->
        <div v-else>
          <NuxtLink to="/auth/login">
            <button class="btn btn-secondary btn-sm text-white px-4 py-2 rounded">Login</button>
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<style>

.watsons-services {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(92deg,#2fe7cc 7%,#a5e43d 99%);
    font-size: 14px;
    color: #333;
    grid-gap: 8px;
    padding-left: 20px;
    padding-right: 20px;
}
</style>