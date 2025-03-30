<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import axios from "axios";

    definePageMeta({ layout: "staff" });

    const route = useRoute();
    const customerId = ref(route.params.id);
    const username = ref(route.query.username || "-");

    const orders = ref([]);
    const statusOptions = ["All", "Pending", "Approved", "Delivered", "Succeed", "Failed"];
    const activeTab = ref("All");
    const errorMessage = ref("");
    const loading = ref(false);

    const API_ORDERS = "http://localhost/api/customers/orders";

    const fetchOrders = async () => {
        loading.value = true;
        errorMessage.value = "";

        try {
            const response = await axios.get(API_ORDERS, {
                params: { customer_id: customerId.value },
            });

            if (response.data.data) {
                orders.value = response.data.data;
            } else {
                errorMessage.value = "Invalid data format.";
                orders.value = [];
            }
        } catch (error) {
            errorMessage.value = error.message;
            orders.value = [];
        } finally {
            loading.value = false;
        }
    };

    const filteredOrders = () => {
        return activeTab.value === "All"
            ? orders.value
            : orders.value.filter((order) => order.status === activeTab.value);
    };

    onMounted(() => {
        fetchOrders();
    });
</script>

<template>
    <div class="mt-10 mx-16">
        <h1 class="text-2xl font-bold mb-4">Orders for Customer {{ username }}</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

        <div class="flex gap-4 mb-4">
            <button v-for="status in statusOptions" :key="status" @click="activeTab = status"
                class="p-2 px-4 rounded border"
                :class="{'bg-blue-500 text-white': activeTab === status}">
                {{ status }}
            </button>
        </div>

        <div v-if="loading" class="text-gray-500">Loading orders...</div>

        <div v-if="orders.length > 0" class="bg-white p-4 shadow-md rounded">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-2 border">Order ID</th>
                        <th class="p-2 border">Product ID</th>
                        <th class="p-2 border">Quantity</th>
                        <th class="p-2 border">Total</th>
                        <th class="p-2 border">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in filteredOrders()" :key="order.id" class="hover:bg-gray-100">
                        <td class="p-2 border text-center">{{ order.id }}</td>
                        <td class="p-2 border text-center">{{ order.product_id }}</td>
                        <td class="p-2 border text-center">{{ order.quantity }}</td>
                        <td class="p-2 border text-center">${{ order.total.toFixed(2) }}</td>
                        <td class="p-2 border text-center">
                            <span class="font-bold" :class="{
                                'text-blue-500': order.status === 'Pending',
                                'text-green-500': order.status === 'Approved',
                                'text-yellow-500': order.status === 'Delivered',
                                'text-red-500': order.status === 'Failed',
                                'text-gray-500': order.status === 'Succeed'
                            }">
                                {{ order.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="text-gray-500">No orders found for this customer.</div>
    </div>
</template>
