<script setup>
    definePageMeta({
        layout: 'staff',
    });

    const router = useRouter();
    const orders = ref([]);
    const statusOptions = ["All", "PENDING", "APPROVED", "DELIVERED", "SUCCEED", "FAILED"];
    const activeTab = ref("All");
    const errorMessage = ref("");

    const isConfirmModalOpen = ref(false);
    const selectedOrder = ref(null);
    const selectedStatus = ref("");

    const fetchOrders = async () => {
        try {
            const response = await apiClient.get('/staffs/orders');
            orders.value = response.data.data;
        } catch (error) {
            errorMessage.value = "Failed to load orders.";
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

    const viewOrderDetail = (orderId) => {
        router.push(`/staff/order/${orderId}`);
    };

    onMounted(fetchOrders);
</script>

<template>
    <div class="mt-10 mx-16">
        <h1 class="text-2xl font-bold mb-4">Order List</h1>

        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

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

        <div class="bg-white p-4 shadow-md rounded">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="p-2 border">Order ID</th>
                        <th class="p-2 border">Customer ID</th>
                        <th class="p-2 border">Total Price</th>
                        <th class="p-2 border">Payment Method</th>
                        <th class="p-2 border">Status</th>
                        <th class="p-2 border">Actions</th>
                        <th class="p-2 border">Detail</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in filteredOrders()" :key="order.order_id" class="hover:bg-gray-100">
                        <td class="p-2 border text-center">{{ order.order_id }}</td>
                        <td class="p-2 border text-center">{{ order.customer_id }}</td>
                        <td class="p-2 border text-center">{{ order.total_price }}</td>
                        <td class="p-2 border text-center">{{ order.payment.method }}</td>
                        <td class="p-2 border text-center ">
                            <span class="font-bold" :class="{
                                'text-gray-500': order.status === 'PENDING',
                                'text-blue-500': order.status === 'APPROVED',
                                'text-yellow-500': order.status === 'DELIVERED',
                                'text-red-500': order.status === 'FAILED',
                                'text-green-500': order.status === 'SUCCEED'
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

                        <td class="p-2 border text-center">
                            <button
                                @click="viewOrderDetail(order.order_id)"
                                class="bg-gray-500 text-white p-1 px-3 rounded"
                            >
                                View Detail
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

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
