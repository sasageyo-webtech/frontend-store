<script setup>
    import { ref } from "vue";

    const orders = ref([ 
        { id: 1, order_id: "P123",  quantity: 2, total: 99.99, status: "To Approve" },
        { id: 2, order_id: "P456", quantity: 1, total: 149.50, status: "To Approve" },
        { id: 3, order_id: "P789", quantity: 3, total: 200.00, status: "To Delivery" },
        { id: 4, order_id: "P101", quantity: 5, total: 75.25, status: "Succeed" },
        { id: 5, order_id: "P534", quantity: 2, total: 75.25, status: "Failed" },
    ]);

    const statusOptions = ["To Approve", "To Delivery", "Succeed", "Failed"];
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
                    <td class="p-2 border text-center">{{ order.id }}


                        
                    </td>
                    <td class="p-2 border text-center">{{ order.product_id }}</td>
                    <td class="p-2 border text-center">{{ order.quantity }}</td>
                    <td class="p-2 border text-center">${{ order.total.toFixed(2) }}</td>
                    <td class="p-2 border text-center">

                    <span class="font-bold" :class="{
                        'text-blue-500': order.status === 'To Approve',
                        'text-green-500': order.status === 'Succeed',
                        'text-yellow-500': order.status === 'To Delivery',
                        'text-red-500': order.status === 'Failed',
                        // 'text-gray-500': order.status === 'Succeed'
                    }">
                        {{ order.status }}
                    </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="card card-body bg-slate-100 p-6 flex flex-col min-h-full">
                    <div class="overflow-x-auto flex-grow">
                        <table class="table">
                            <!-- head -->
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Price / Unit</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr class="bg-base-100">
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle h-12 w-12">
                                                    <img src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">Hart Hagerty</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-ghost badge-m">189 ฿</span></td>
                                    <td>1</td>
                                    <th><div class="badge badge-outline badge-ghost">189 ฿</div></th>
                                </tr>
                                <!-- row 2 -->
                                <tr class="bg-base-100">
                                    <td>
                                        <div class="flex items-center gap-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle h-12 w-12">
                                                    <img src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">Hart Hagerty</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="badge badge-ghost badge-m">100 ฿</span></td>
                                    <td>1</td>
                                    <th><div class="badge badge-outline badge-ghost">100 ฿</div></th>
                                </tr>
                            </tbody>

                            <!-- foot -->
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th class="py-4">Delivery Fee</th>
                                    <th><span class="badge">45 ฿</span></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <div class="pb-3">Total Price</div>
                                        <div class="badge badge-soft badge-success text-white">334 ฿</div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>













    </div>
</template>

<style lang="scss" scoped>
</style>
