<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    definePageMeta({
        layout: 'staff',
    });

    const router = useRouter();

    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = 10;

    const users = ref([]);
    const selectedUser = ref(null);

    const loading = ref(false);
    const errorMessage = ref('');
    const showAddress = ref(false);
    const address = ref(null);

    const API_BASE = 'http://localhost/api/users';
    const API_ADDRESS = 'http://localhost/api/address-customers';

    const fetchUsers = async (page = 1) => {
        loading.value = true;
        errorMessage.value = '';
        try {
            const response = await axios.get(API_BASE, {
                params: {page, limit: itemsPerPage}
            });

            if (response.data.data) {
                users.value = response.data.data;
                console.log("User : ", response.data.data)
                console.log("Total : ", response.data.total)
                totalPages.value = Math.ceil(response.data.total / itemsPerPage);
            } else {
                errorMessage.value = 'Failed to fetch users: Invalid data format.';
            }
        } catch (error) {
            errorMessage.value = `Failed to fetch users: ${error.message}`;
        } finally {
            loading.value = false;
        }
    };

    
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            currentPage.value = newPage;
            fetchUsers(newPage);
        }
    };

    const selectUser = (user) => {
        selectedUser.value = { ...user };
        fetchAddress(user.customer_id);
    };

    const fetchAddress = async (userId) => {
        try {
            const response = await axios.get(`${API_ADDRESS}?customer_id=${userId}`);
            if (response.data) {
                address.value = response.data.data[0];
            } else {
                address.value = null;
            }
        } catch (error) {
            address.value = null;
            console.error('Error fetching address:', error);
        }
    };

    const toggleAddress = () => {
        showAddress.value = !showAddress.value;
    };

    const goToUserOrders = () => {
        if (selectedUser.value) {
            router.push(`/staff/user/order/${selectedUser.value.customer_id}`);
        }
    };

    onMounted(() => {
        fetchUsers();
    });
</script>

<template>
    <div class="mt-10 mx-16 flex gap-10">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold mb-4">User List</h1>
            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
            <div v-if="loading" class="text-gray-500">Loading users...</div>
            <ul v-else>
                <li v-for="user in users" :key="user.user_id" @click="selectUser(user)" class="flex justify-between hover:bg-gray-200 items-center my-2 p-2 px-3 border border-gray-300 shadow-xl rounded cursor-pointer">
                    <div class="flex items-center">
                        <!-- <img :src="user.image_path" alt="User Image" class="w-12 h-12 object-cover mr-4 rounded-full" /> -->
                        <div>
                            <span class="font-bold">{{ user.firstname }} {{ user.lastname }}</span> - {{ user.email }}
                        </div>
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

        <div v-if="selectedUser" class="w-1/2 h-fit p-6 mt-12 border border-gray-300 rounded shadow-md">
            <div class="flex justify-between">
                <h2 class="text-xl font-bold">User Information</h2>
                <div class="flex gap-5">
                    <button @click="toggleAddress" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-900">Address</button>
                    <button @click="goToUserOrders" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-900">Orders</button>
                </div>
            </div>
            <div class="p-4 space-y-3">
                <!-- <div v-if="selectedUser.image_path">
                    <p class="font-bold">Profile Picture:</p>
                    <img :src="selectedUser.image_path" alt="User Image" class="w-24 h-24 object-cover rounded-md" />
                </div> -->
                <p><strong>Username:</strong> {{ selectedUser.username }}</p>
                <p><strong>Email:</strong> {{ selectedUser.email }}</p>
                <p><strong>First Name:</strong> {{ selectedUser.firstname }}</p>
                <p><strong>Last Name:</strong> {{ selectedUser.lastname }}</p>
                <p><strong>Gender:</strong> {{ selectedUser.gender }}</p>
                <p><strong>Citizen Code:</strong> {{ selectedUser.citizen_code || 'N/A' }}</p>
                <p><strong>Birthdate:</strong> {{ selectedUser.birthdate || 'N/A' }}</p>
                <p><strong>Phone Number:</strong> {{ selectedUser.phone_number || 'N/A' }}</p>
                <p><strong>Role:</strong> {{ selectedUser.role }}</p>
                <p><strong>Email Verified:</strong> {{ selectedUser.email_verified_at ? 'Yes' : 'No' }}</p>
            </div>
            
            <div v-if="showAddress && address" class="p-4 space-y-3 border-t border-gray-300 mt-4">
                <h3 class="font-bold text-lg">Address Information</h3>
                <p><strong>Phone Number:</strong> {{ address.phone_number }}</p>
                <p><strong>House Number:</strong> {{ address.house_number }}</p>
                <p><strong>Building:</strong> {{ address.building }}</p>
                <p><strong>Street:</strong> {{ address.street }}</p>
                <p><strong>Sub District:</strong> {{ address.sub_district }}</p>
                <p><strong>District:</strong> {{ address.district }}</p>
                <p><strong>Province:</strong> {{ address.province }}</p>
                <p><strong>Country:</strong> {{ address.country }}</p>
                <p><strong>Postal Code:</strong> {{ address.postal_code }}</p>
                <p><strong>Detail Address:</strong> {{ address.detail_address }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
