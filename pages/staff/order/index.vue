<script setup>
    import { ref } from "vue";

    definePageMeta({
        layout: 'staff',
    })

    const orders = ref([
        { id: 1, product_id: "P123", quantity: 2, total: 99.99, status: "Pending" },
        { id: 2, product_id: "P456", quantity: 1, total: 149.50, status: "Approved" },
        { id: 3, product_id: "P789", quantity: 3, total: 200.00, status: "Delivered" },
        { id: 4, product_id: "P101", quantity: 5, total: 75.25, status: "Failed" },
    ]);

    const statusOptions = ["Pending", "Approved", "Delivered", "Succeed", "Failed"];
    const activeTab = ref("All");
    const errorMessage = ref("");

    // Filter orders based on selected tab
    const filteredOrders = () => {
        return activeTab.value === "All"
            ? orders.value
            : orders.value.filter((order) => order.status === activeTab.value);
    };

    const updateOrderStatus = (order) => {
        let newStatus = "";

        if (order.status === "Pending") {
            newStatus = "Approved";
        } else if (order.status === "Approved") {
            newStatus = "Delivered";
        } else {
            errorMessage.value = "This order's status cannot be changed.";
            return;
        }

        order.status = newStatus;
        console.log(`Order ${order.id} status changed to: ${newStatus}`);
    };
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
                    <td class="p-2 border text-center">${{ order.total.toFixed(2) }}</td>
                    <td class="p-2 border text-center">
                    <!-- Just show the status as text -->
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
                        v-if="order.status === 'Pending'"
                        @click="updateOrderStatus(order)"
                        class="bg-blue-500 text-white p-1 px-3 rounded"
                    >
                        Approve
                    </button>

                    <button
                        v-else-if="order.status === 'Approved'"
                        @click="updateOrderStatus(order)"
                        class="bg-green-500 text-white p-1 px-3 rounded"
                    >
                        Deliver
                    </button>

                    <p v-else>-</p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
