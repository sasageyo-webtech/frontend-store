<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    definePageMeta({
        layout: 'staff',
    });

    const router = useRouter();

    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = 20;

    const customers = ref([]);
    const selectedCustomer = ref(null);
    const searchQuery = ref(''); 

    const loading = ref(false);
    const errorMessage = ref('');
    const showAddress = ref(false);
    const addresses = ref([]);

    const API_BASE = 'http://localhost/api/users';
    const API_ADDRESS = 'http://localhost/api/address-customers';

    const fetchCustomers = async (page = 1) => {
        loading.value = true;
        errorMessage.value = '';
        try {
            const response = await axios.get(API_BASE, {
                params: { page, limit: itemsPerPage }
            });

            if (response.data) {
                customers.value = response.data.data;
                totalPages.value = Math.ceil(response.data.meta.total / itemsPerPage);
                console.log("Data : ", response.data.data)
                console.log("Meta Total : ", response.data.meta.total)
                console.log("Items : ", itemsPerPage)
                console.log("Total pages : ", totalPages)
            } else {
                errorMessage.value = 'Failed to fetch customers: Invalid data format.';
            }
        } catch (error) {
            errorMessage.value = `Failed to fetch customers: ${error.message}`;
        } finally {
            loading.value = false;
        }
    };

    const filteredCustomers = computed(() => {
        if (!searchQuery.value) return customers.value;
        return customers.value.filter(customer =>
            (`${customer.firstname} ${customer.lastname}`)
                .toLowerCase()
                .startsWith(searchQuery.value.toLowerCase())
        );
    });

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            currentPage.value = newPage;
            fetchCustomers(newPage);
        }
    };

    const selectCustomer = (customer) => {
        selectedCustomer.value = { ...customer };
        fetchAddress(customer.customer_id);
    };

    const fetchAddress = async (customerId) => {
        try {
            const response = await axios.get(`${API_ADDRESS}?customer_id=${customerId}`);
            addresses.value = response.data.data || [];
        } catch (error) {
            addresses.value = [];
            console.error('Error fetching addresses:', error);
        }
    };

    const toggleAddress = () => {
        showAddress.value = !showAddress.value;
    };

    const goToCustomerOrders = () => {
        if (selectedCustomer.value) {
            router.push({
                path: `/staff/user/order/${selectedCustomer.value.user_id}`,
                query: { username: selectedCustomer.value.username }
            });
        }
    };

    onMounted(() => {
        fetchCustomers();
    });
</script>


<template>
    <div class="mt-10 mx-16 flex gap-10">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold mb-4">Customer List</h1>

            <!-- Search Input -->
            <input v-model="searchQuery" type="text" placeholder="Search by name..."
                class="w-full px-3 py-2 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">

            <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
            <div v-if="loading" class="text-gray-500">Loading customers...</div>
            
            <ul v-else>
                <li v-for="customer in filteredCustomers" :key="customer.customer_id"
                    @click="selectCustomer(customer)"
                    class="flex justify-between hover:bg-gray-200 items-center my-2 p-2 px-3 border border-gray-300 shadow-xl rounded cursor-pointer">
                    <div class="flex items-center">
                        <div>
                            <span class="font-bold">{{ customer.firstname }} {{ customer.lastname }}</span> - {{ customer.email }}
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

        <div v-if="selectedCustomer" class="w-1/2 h-fit p-6 mt-12 border border-gray-300 rounded shadow-md">
            <div class="flex justify-between">
                <h2 class="text-xl font-bold">Customer Information</h2>
                <div class="flex gap-5">
                    <button @click="toggleAddress" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-900">Address</button>
                    <button @click="goToCustomerOrders" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-900">Orders</button>
                </div>
            </div>

            <div class="p-4 space-y-3">
                <!-- <div v-if="selectedcustomer.image_path">
                    <p class="font-bold">Profile Picture:</p>
                    <img :src="selectedcustomer.image_path" alt="customer Image" class="w-24 h-24 object-cover rounded-md" />
                </div> -->
                <p><strong>Customername:</strong> {{ selectedCustomer.username || '-'}}</p>
                <p><strong>Email:</strong> {{ selectedCustomer.email || '-'}}</p>
                <p><strong>First Name:</strong> {{ selectedCustomer.firstname || '-'}}</p>
                <p><strong>Last Name:</strong> {{ selectedCustomer.lastname || '-'}}</p>
                <p><strong>Gender:</strong> {{ selectedCustomer.gender || '-'}}</p>
                <p><strong>Citizen Code:</strong> {{ selectedCustomer.citizen_code || 'N/A' }}</p>
                <p><strong>Birthdate:</strong> {{ selectedCustomer.birthdate || 'N/A' }}</p>
                <p><strong>Phone Number:</strong> {{ selectedCustomer.phone_number || 'N/A' }}</p>
                <p><strong>Role:</strong> {{ selectedCustomer.role || '-'}}</p>
                <p><strong>Email Verified:</strong> {{ selectedCustomer.email_verified_at ? 'Yes' : 'No' }}</p>
            </div>

            <div v-if="showAddress && addresses.length > 0" class="p-4 space-y-3 border-t border-gray-300 mt-4">
                <h3 class="font-bold text-lg">Addresses</h3>
                <div v-for="(addr, index) in addresses" :key="index" class="border p-3 rounded-md bg-gray-100 my-2">
                    <h4 class="font-bold text-md">Address {{ index + 1 }}</h4>
                    <p><strong>Name:</strong> {{ addr.name || '-'}}</p>
                    <p><strong>Phone Number:</strong> {{ addr.phone_number || '-'}}</p>
                    <p><strong>House Number:</strong> {{ addr.house_number || '-'}}</p>
                    <p><strong>Building:</strong> {{ addr.building || '-'}}</p>
                    <p><strong>Street:</strong> {{ addr.street || '-'}}</p>
                    <p><strong>Sub District:</strong> {{ addr.sub_district || '-'}}</p>
                    <p><strong>District:</strong> {{ addr.district || '-'}}</p>
                    <p><strong>Province:</strong> {{ addr.province || '-'}}</p>
                    <p><strong>Country:</strong> {{ addr.country || '-'}}</p>
                    <p><strong>Postal Code:</strong> {{ addr.postal_code || '-'}}</p>
                    <p><strong>Detail Address:</strong> {{ addr.detail_address || '-'}}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
