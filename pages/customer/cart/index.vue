<template>
    <div>
        <div class="grid gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg m-20">
            <div>
                <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                <tr>
                    <th>Delete</th>
                    <th>Products</th>
                    <th>Price / Unit</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>



                <!-- row 1 -->
                <tr>
                    <th>
                    <button>
                        <SvgDelete></SvgDelete>
                    </button>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                        <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    <!-- Zemlak, Daniel and Leannon
                    <br /> -->
                    <span class="badge badge-ghost badge-m">189 ฿</span>
                    </td>
                    <td>
                        <!-- <input type="number" class="input validator" required placeholder="1" 
                            min="1" max="100" /> -->

                            <UpdateAmount></UpdateAmount>
                    </td>
                    <th>
                        <span class="badge badge-primary badge-m">189 ฿</span>
                    </th>
                </tr>


                <!-- loop  ------------------------------- -->

                <!-- row 2 -->
                <tr>
                    <th>
                    <button>
                        <SvgDelete></SvgDelete>
                    </button>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                        <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    <!-- Zemlak, Daniel and Leannon
                    <br /> -->
                    <span class="badge badge-ghost badge-m">189 ฿</span>
                    </td>
                    <td>
                        <!-- <input type="number" class="input validator" required placeholder="1" 
                            min="1" max="100" /> -->

                            <UpdateAmount></UpdateAmount>
                    </td>
                    <th>
                        <span class="badge badge-primary badge-m">189 ฿</span>
                    </th>
                </tr>
                <!-- row 3 -->
                <tr>
                    <th>
                    <button>
                        <SvgDelete></SvgDelete>
                    </button>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                        <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    <!-- Zemlak, Daniel and Leannon
                    <br /> -->
                    <span class="badge badge-ghost badge-m">189 ฿</span>
                    </td>
                    <td>
                        <!-- <input type="number" class="input validator" required placeholder="1" 
                            min="1" max="100" /> -->

                            <UpdateAmount></UpdateAmount>
                    </td>
                    <th>
                        <span class="badge badge-primary badge-m">189 ฿</span>
                    </th>
                </tr>
                <!-- row 4 -->
                <tr>
                    <th>
                    <button>
                        <SvgDelete></SvgDelete>
                    </button>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                        <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                        </div>
                    </div>
                    </td>
                    <td>
                    <!-- Zemlak, Daniel and Leannon
                    <br /> -->
                    <span class="badge badge-ghost badge-m">189 ฿</span>
                    </td>
                    <td>
                        <!-- <input type="number" class="input validator" required placeholder="1" 
                            min="1" max="100" /> -->

                            <UpdateAmount></UpdateAmount>
                    </td>
                    <th>
                        <span class="badge badge-primary badge-m">189 ฿</span>
                    </th>
                </tr>
                </tbody>
                <!-- foot -->
                <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="">
                        <div class="pb-3">Total Price </div>
                        <span class="badge badge-secondary badge-lg">189 ฿</span>
                        <NuxtLink to="/customer/checkout">
                        <div class="pt-5">
                        <button class="btn btn-info text-white">Checkout</button>
                        </div>
                        </NuxtLink>
                    </th>
                </tr>
                </tfoot>
            </table>


        </div>
            </div>


        </div>




    </div>
</template>

<script setup>

</script>

