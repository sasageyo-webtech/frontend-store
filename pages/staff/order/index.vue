<script setup> // ถ้าคุณใช้ API client

definePageMeta({
    layout: 'staff',
});

const router = useRouter();  // ใช้ Vue Router
const orders = ref([]);
const statusOptions = ["All", "PENDING", "APPROVED", "DELIVERED", "SUCCEED", "FAILED"];
const activeTab = ref("All");
const errorMessage = ref("");

// Fetch orders from the API on page load
const fetchOrders = async () => {
    try {
        const response = await apiClient.get('/staffs/orders');
        orders.value = response.data.data;
    } catch (error) {
        errorMessage.value = "Failed to load orders.";
    }
};

// Filter orders based on the selected status tab
const filteredOrders = () => {
    return activeTab.value === "All"
        ? orders.value
        : orders.value.filter((order) => order.status === activeTab.value);
};

// Update order status
const updateOrderStatus = async (order, newStatus) => {
    try {
        const response = await apiClient.patch(`/orders/${order.order_id}`, { status: newStatus });
        order.status = newStatus; // Optimistically update status in the UI
        console.log(`Order ${order.order_id} status changed to: ${newStatus}`);
    } catch (error) {
        errorMessage.value = "Failed to update order status.";
    }
};

// Navigate to order detail page
const viewOrderDetail = (orderId) => {
    router.push(`/staff/order/${orderId}`);  // เปลี่ยนเส้นทางไปที่หน้า Order Detail
};

// Fetch orders on component mount
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
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in filteredOrders()" :key="order.order_id" class="hover:bg-gray-100">
                        <td class="p-2 border text-center">{{ order.order_id }}</td>
                        <td class="p-2 border text-center">{{ order.customer_id }}</td>
                        <td class="p-2 border text-center">{{ order.total_price }}</td>
                        <td class="p-2 border text-center">{{ order.payment.method }}</td>
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
                                @click="updateOrderStatus(order, 'APPROVED')"
                                class="bg-blue-500 text-white p-1 px-3 rounded"
                            >
                                Approve
                            </button>

                            <button
                                v-else-if="order.status === 'APPROVED'"
                                @click="updateOrderStatus(order, 'DELIVERED')"
                                class="bg-green-500 text-white p-1 px-3 rounded"
                            >
                                Deliver
                            </button>

                            <p v-else>-</p>

                            <!-- View Order Detail Button -->
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
    </div>
</template>

<style lang="scss" scoped>
</style>
