<script setup>
const { $swal } = useNuxtApp()
const userStore = useUser()
const carts = ref([])

const deleteCart = async (cart_id) => {
    $swal.fire({
        title: "Do you want to delete the product?",
        showCancelButton: true,
        confirmButtonText: "Delete",
    }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const response = await apiClient.delete(`/carts/${cart_id}`)
                    $swal.fire("Delete!", "", "success");
                    await fetchCarts()
                }catch (error){
                    if(error.response){
                        $swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: error.response.errors.cart_id,
                        });
                    }
                }
            } 
    });
}

const calculateTotalPrice = () => {
    const totalPrice = carts.value.reduce((sum, cart) => sum + cart.total_price, 0);
    return totalPrice;
}

const fetchCarts = async () => {
    const cartsResponse = await apiClient.get(`/carts?customer_id=${userStore.userInfo.customer_id}`);
    carts.value = cartsResponse.data.data
}

onMounted( async ()=>{
    userStore.loadUser();
    fetchCarts()
    
})

watchEffect(() => {
    fetchCarts()
})

</script>

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
                <tr  v-for="(cart, index) in carts" :key="index">
                    <th>
                    <button @click="deleteCart(cart.cart_id)">
                        <SvgDelete></SvgDelete>
                    </button>
                    </th>

                    <td>
                        <div class="flex items-center gap-3">
                        <div class="avatar">
                        <div class="mask mask-squircle h-12 w-12">
                            <img :src="cart.product.image_paths" alt="image of product not found" />
                        </div>
                        </div>
                        <div>
                            <div class="font-bold">{{ cart.product.name }}</div>
                            <!-- <div class="text-sm opacity-50">{{ cart.product.brand }}</div> -->
                        </div>
                    </div>
                    </td>

                    <td>
                    <!-- Zemlak, Daniel and Leannon
                    <br /> -->
                    <span class="badge badge-ghost badge-m">{{ cart.product.price }} ฿</span>
                    </td>

                    <td>
                        <!-- <input type="number" class="input validator" required placeholder="1" 
                            min="1" max="100" /> -->

                            <!-- <UpdateAmount></UpdateAmount> -->
                             <div>{{ cart.quantity }}</div>
                    </td>
                    
                    <th>
                        <div class="badge badge-outline badge-ghost">{{ cart.total_price }} ฿</div>
                    </th>
                </tr>

                </tbody>
                <!-- loop  ------------------------------- -->

               
                <!-- foot -->
                <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                        <div v-if="carts.length != 0">
                        <div class="pb-3">Total Price </div>
                        <div class="badge badge-soft badge-success text-white">{{ calculateTotalPrice() }} ฿</div>
                        <NuxtLink to="/customer/checkout">
                        <div class="pt-5">
                        <button class="btn bg-blue-700 hover:bg-blue-900 text-white rounded-badge">Checkout</button>
                        </div>
                        </NuxtLink>                            
                        </div>

                    </th>
                </tr>
                </tfoot> 
            </table>


        </div>
            </div>


        </div>




    </div>
</template>



