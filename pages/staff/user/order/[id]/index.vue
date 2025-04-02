<script setup>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import axios from "axios";

    definePageMeta({ layout: "staff" });

    const route = useRoute();
    const customerId = ref(route.params);
    const username = ref(route.query.username || "-");

    const orders = ref([]);
    const statusOptions = ["All", "Pending", "Approved", "Delivered", "Succeed", "Failed"];
    const activeTab = ref("All");
    const errorMessage = ref("");
    const loading = ref(false);

    const isConfirmModalOpen = ref(false);
    const selectedOrder = ref(null);
    const selectedStatus = ref("");

    const API_ORDERS = "http://localhost/api/customers/orders";

    const fetchOrders = async () => {
        loading.value = true;
        errorMessage.value = "";

        try {
            console.log("Param : ", route.params)
            console.log("ID : ", customerId.value.id)
            const response = await axios.get(`${API_ORDERS}/${customerId.value.id}`);

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

    const confirmUpdateOrderStatus = (order, newStatus) => {
        selectedOrder.value = order;
        selectedStatus.value = newStatus;
        isConfirmModalOpen.value = true;
    };

    const updateOrderStatus = async () => {
        try {
            const response = await apiClient.patch(`/orders/${selectedOrder.value.order_id}`, { status: selectedStatus.value });

            selectedOrder.value.status = selectedStatus.value;
            // alert(`Order ${selectedOrder.value.order_id} updated to ${selectedStatus.value}!`);
            
            isConfirmModalOpen.value = false; // ปิด Modal
        } catch (error) {
            alert("Failed to update order status.");
        }
    };

    onMounted(() => {
        fetchOrders();
    });
</script>

<template>
    <div class="mt-10 mx-16">
        <h1 class="text-2xl font-bold mb-4">Orders for Customer {{ username }}</h1>

        <!-- <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div> -->

        <div class="flex gap-4 mb-4">
            <button
                v-for="status in statusOptions"
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
                        <th class="p-2 border">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in filteredOrders()" :key="order.id" class="hover:bg-gray-100">
                        <td class="p-2 border text-center">{{ order.id }}</td>
                        <td class="p-2 border text-center">{{ order.product_id }}</td>
                        <td class="p-2 border text-center">{{ order.quantity }}</td>
                        <td class="p-2 border text-center">${{ order.total }}</td>
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

                        <td class="p-2 border text-center flex gap-2 justify-center">
                            <button
                                v-if="order.status === 'PENDING'"
                                @click="confirmUpdateOrderStatus(order, 'APPROVED')"
                                class="bg-blue-500 text-white p-1 px-3 rounded"
                            >
                                Approve
                            </button>

                            <button
                                v-else-if="order.status === 'APPROVED'"
                                @click="confirmUpdateOrderStatus(order, 'DELIVERED')"
                                class="bg-green-500 text-white p-1 px-3 rounded"
                            >
                                Deliver
                            </button>

                            <p v-else class="p-1 px-3">-</p>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="text-gray-500">No orders found for this customer.</div>
        
        <!-- Confirmation Modal -->
        <div v-if="isConfirmModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-6 rounded shadow-lg w-96">
                <h2 class="text-xl font-bold mb-4">Confirm Status Change</h2>
                <p>Are you sure you want to update Order?<strong>#{{ selectedOrder?.order_id }}</strong> <br>to <strong>{{ selectedStatus }}</strong>?</p>
                
                <div class="flex justify-end mt-4 gap-2">
                    <button @click="isConfirmModalOpen = false" class="px-4 py-2 bg-gray-300 hover:bg-gray-600 hover:text-white rounded">Cancel</button>
                    <button @click="updateOrderStatus" class="px-4 py-2 bg-blue-300 hover:bg-blue-600 hover:text-white rounded">Confirm</button>
                </div>
            </div>
        </div>
    
    </div>
</template>
<style lang="scss" scoped>
</style>
