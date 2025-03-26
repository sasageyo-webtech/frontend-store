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

    const filteredOrders = () => {
        return activeTab.value === "All"
            ? orders.value
            : orders.value.filter((order) => order.status === activeTab.value);
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
    </div>
</template>

<style lang="scss" scoped>
</style>
