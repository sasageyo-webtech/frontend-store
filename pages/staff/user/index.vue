<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    definePageMeta({
        layout: 'staff',
    });

    const users = ref([]);
    const selectedUser = ref(null);
    const loading = ref(false);
    const errorMessage = ref('');
    const API_BASE = 'http://localhost/api/users';

    const fetchUsers = async () => {
        loading.value = true;
        errorMessage.value = '';
        try {
            const response = await axios.get(API_BASE);
            if (response.data.data) {
                console.log(response.data.data)
                users.value = response.data.data;
            } else {
                errorMessage.value = 'Failed to fetch users: Invalid data format.';
            }
        } catch (error) {
            errorMessage.value = error.message;
        } finally {
            loading.value = false;
        }
    };

    const selectUser = (user) => {
        selectedUser.value = { ...user };
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
                <li v-for="user in users" :key="user.id" @click="selectUser(user)" class="flex justify-between hover:bg-gray-200 items-center my-2 p-2 px-3 border border-gray-300 shadow-xl rounded cursor-pointer">
                    <div class="flex items-center">
                        <img :src="user.image_path" alt="User Image" class="w-12 h-12 object-cover mr-4 rounded-full" />
                        <div>
                            <span class="font-bold">{{ user.firstname }} {{ user.lastname }}</span> - {{ user.email }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div v-if="selectedUser" class="w-1/2 h-fit p-6 mt-12 border border-gray-300 rounded shadow-md">
            <h2 class="text-xl font-bold">User Information</h2>
            <div class="p-4 space-y-3">
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
                <div v-if="selectedUser.image_path">
                    <p class="font-bold">Profile Picture:</p>
                    <img :src="selectedUser.image_path" alt="User Image" class="w-24 h-24 object-cover rounded-md" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
</style>