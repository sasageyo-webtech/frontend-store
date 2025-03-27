<script setup>
const userStore = useUser()
const carts = ref([])

const deleteCart = async (cart_id) => {
    const response = await apiClient.delete(`/carts/${cart_id}`)
    console.log(response.status)

}

onMounted( async ()=>{
    userStore.loadUser();

    const cartsResponse = await apiClient.get(`/carts?customer_id=${userStore.userInfo.customer_id}`);
    carts.value = cartsResponse.data.data

    console.log(carts.value)
})

</script>

<template>
    <div>
        <pre>
            {{  carts }}
        </pre>
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
                    <button @click="deleteCart(51)">
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
                        <div class="badge badge-outline badge-ghost">189 ฿</div>
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
                        <div class="badge badge-outline badge-ghost">189 ฿</div>
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
                        <div class="badge badge-outline badge-ghost">189 ฿</div>
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
                        <div class="badge badge-outline badge-ghost">189 ฿</div>
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
                        <div class="badge badge-soft badge-success text-white">756 ฿</div>
                        <NuxtLink to="/customer/checkout">
                        <div class="pt-5">
                        <button class="btn bg-blue-700 hover:bg-blue-900 text-white rounded-badge">Checkout</button>
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



