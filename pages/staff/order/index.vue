<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    definePageMeta({
        layout: 'staff',
        })

    const orders = ref([
    { id: 1, customer_name: "John Doe", total: 99.99, status: "Pending" },
    { id: 2, customer_name: "Alice Smith", total: 149.50, status: "Processing" },
    { id: 3, customer_name: "Michael Brown", total: 200.00, status: "Shipped" },
    { id: 4, customer_name: "Emily Davis", total: 75.25, status: "Pending" },
    ]);

    const API_BASE = "http://localhost/api/orders";
    const statusOptions = ["Pending", "Processing", "Shipped", "Delivered"];
    const errorMessage = ref("");

    // const fetchOrders = async () => {
    //     try {
    //         const response = await axios.get(API_BASE);
    //         orders.value = response.data.data;
    //     } catch (error) {
    //         console.error("Fetch Error:", error.message);
    //         errorMessage.value = "Failed to fetch orders.";
    //     }
    // };

    const activeTab = ref("All");

    const filteredOrders = () => {
    return activeTab.value === "All"
        ? orders.value
        : orders.value.filter((order) => order.status === activeTab.value);
    };

    const updateOrderStatus = (order) => {
        console.log(`Order ${order.id} status changed to: ${order.status}`);
    };

    // const updateOrderStatus = async (order) => {
    // try {
    //     const response = await axios.put(`${API_BASE}/${order.id}`, {
    //     status: order.status,
    //     });
    //     if (response.status !== 200) {
    //     errorMessage.value = "Failed to update order status.";
    //     }
    // } catch (error) {
    //     console.error("Update Error:", error.message);
    //     errorMessage.value = "Error updating order status.";
    // }
    // };

    // onMounted(fetchOrders);
</script>

<template>
    <div class="mt-10 mx-16">
        <h1 class="text-2xl font-bold mb-4">Order List</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
    
        <div class="flex gap-4 mb-4">
            <button
                v-for="status in ['All', ...statusOptions]"
                :key="status"
                @click="activeTab = status"
                class="p-2 px-4 rounded border transition"
                :class="{
                    'bg-blue-500 text-white': activeTab === status,
                    'bg-gray-200 hover:bg-gray-800 hover:text-white': activeTab !== status
                }"
                >
                {{ status }}
            </button>
        </div>
    
        <div class="bg-white p-4 shadow-md rounded">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                    <th class="p-2 border">Order ID</th>
                    <th class="p-2 border">Customer</th>
                    <th class="p-2 border">Total</th>
                    <th class="p-2 border">Status</th>
                    <th class="p-2 border">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in filteredOrders()" :key="order.id" class="hover:bg-gray-100">
                        <td class="p-2 border text-center">{{ order.id }}</td>
                        <td class="p-2 border">{{ order.customer_name }}</td>
                        <td class="p-2 border text-center">${{ order.total.toFixed(2) }}</td>
                        <td class="p-2 border text-center">
                            <select v-model="order.status" class="border p-1 rounded">
                            <option v-for="status in statusOptions" :key="status" :value="status">
                                {{ status }}
                            </option>
                            </select>
                        </td>

                        <td class="p-2 border text-center flex gap-2 justify-center">
                            <button @click="updateOrderStatus(order)" class="bg-blue-500 text-white p-1 px-3 rounded">
                                Update Status
                            </button>
                            <button class="bg-red-500 text-white p-1 px-3 rounded">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>