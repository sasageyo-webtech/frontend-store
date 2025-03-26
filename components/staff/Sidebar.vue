<script setup lang="ts">
import { ref } from 'vue'

const isProductMenuOpen = ref(false)

const toggleProductMenu = () => {
    isProductMenuOpen.value = !isProductMenuOpen.value
}
</script>

<template>
    <div>
        <div class="flex justify-between px-4 py-6">
            <strong class="text-s align-baseline">MENU</strong>
        </div>

        <aside id="sidebar-multi-level-sidebar" class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl px-4" aria-label="Sidebar">
            <div class="h-full px-4 overflow-y-auto bg-white">
                <ul class="space-y-2 font-medium">
                    <li>
                        <NuxtLink to="/staff/user">
                            <div class="flex items-center p-2 rounded-lg text-black hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 512 512">
                                    !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                                <span class="ms-3 text-gray-600">User</span>
                            </div>
                        </NuxtLink>
                    </li>

                    <li>
                        <NuxtLink to="/staff">
                            <div class="flex items-center p-2 rounded-lg text-black hover:bg-gray-200">
                                <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span class="ms-3 text-gray-600">Dashboard</span>
                            </div>
                        </NuxtLink>
                    </li>

                    <li>
                        <button @click="toggleProductMenu" class="w-full text-left flex items-center p-2 rounded-lg text-black hover:bg-gray-200">
                            <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span class="flex-1 ms-3 text-gray-600">Products</span>
                            <svg class="w-4 h-4 ml-auto transform transition-transform" :class="{'rotate-180': isProductMenuOpen}" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>

                        <ul v-if="isProductMenuOpen" class="pl-8 space-y-2">
                            <li>
                                <NuxtLink to="/staff/product" class="block p-2 text-gray-600 hover:bg-gray-200 rounded">
                                    View Products
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/staff/product/create" class="block p-2 text-gray-600 hover:bg-gray-200 rounded">
                                    Create Product
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <NuxtLink to="/staff/order">
                            <div class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200">
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span class="flex-1 ms-3 text-gray-600">Orders</span>
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</template>
