<script setup>
const { $swal } = useNuxtApp()
const userStore = useUser()
const carts = ref([])
const customer_address = ref({})
const hasAddress = ref()
const imageFile = ref(null) 
const router = useRouter()
const errorMessage = ref()

const fetchCarts = async () => {
    try {
        const cartsResponse = await apiClient.get(`/carts?customer_id=${userStore.userInfo.customer_id}`);
        carts.value = cartsResponse.data.data
    }catch (error){
        if(error.response){
            $swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: 'Please try to refresh again',
                confirmButtonText: "Back",
            }).then(result => {
                if(result.isConfirmed){
                    router.push("/customer/cart")
                }
            })
        }else{
            console.log("something wrong not about backend")
        }
    }

}

// Calculate the total price (sum of all cart items' total_price + delivery fee)
const calculateTotalPrice = () => {
    const totalPrice = carts.value.reduce((sum, cart) => sum + cart.total_price, 0);
    const deliveryFee = 45; 
    return totalPrice + deliveryFee;
}

const fetchAddress = async () => {
    const { customer_address_id } = useRoute().query;
    if(customer_address_id){
        hasAddress.value = true
        const response = await apiClient.get(`/address-customers/${customer_address_id}`);
        customer_address.value = response.data.data
        
    }else{
        hasAddress.value =false
    }
}

// Function to handle file selection and validate it
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        imageFile.value = file; // Store the file if it's an image
    } else {
        alert("Please upload a valid image file (PNG, JPG, JPEG).");
        event.target.value = '';  // Reset file input
    }
};


const createOrder = async () => {
    if (!imageFile.value) {
        alert("Please upload the QR code image.");
        return;
    }

    const formData = new FormData();
    formData.append('customer_id', userStore.userInfo.customer_id);
    formData.append('address_customer_id', customer_address.value.customer_address_id);
    formData.append('image_receipt_path', imageFile.value);

    try {
        const response = await apiClient.post('/customers/orders', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        // ตรวจสอบสถานะ HTTP Response
        if (response.status === 201 || response.status === 200) {
            alert("Order created successfully!");
            console.log("Order created successfully", response.data);
            router.push('/customer/order');
        } else {
            throw new Error(response.data.message || "Failed to create order");
        }
    } catch (error) {
        if (error.response) {
            // มี response จากเซิร์ฟเวอร์
            if (error.response.status === 400) {
                alert(`Error: ${error.response.data.message || "Invalid request"}`);
            } else if (error.response.status === 404) {
                alert("Error: Customer not found");
            } else {
                alert(`Unexpected error: ${error.response.data.message || "Please try again later."}`);
            }
            console.error("API Error:", error.response.data);
        } else if (error.request) {
            // ไม่มี response จากเซิร์ฟเวอร์ (อาจเป็นปัญหาการเชื่อมต่อ)
            alert("Network error: Please check your internet connection.");
            console.error("Network Error:", error.request);
        } else {
            // Error ที่เกิดขึ้นจาก JavaScript เอง
            alert(`Error: ${error.message}`);
            console.error("Client Error:", error.message);
        }
    }
};

onMounted(async () => {
    await userStore.loadUser()
    await fetchAddress()
    fetchCarts()
})

watchEffect(() => {
    fetchAddress()
}, { flush: 'post' })


</script>

<template>
    <div>
        <NuxtLink to="/customer/cart" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>

        <br>

        <div class="grid grid-cols-2 space-x-2 mx-20">
            <!-- Checkout Left Section -->
            <div class="card card-body bg-slate-100 p-6">
                <div class="overflow-x-auto flex-grow">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Products</th>
                                <th>Price / Unit</th>
                                <th>Amount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(cart, index) in carts" :key="index" class="bg-base-100">
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle h-12 w-12">
                                                <img :src="cart.product.image_paths" alt="image of product not found" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">{{ cart.product.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="badge badge-ghost badge-m">{{ cart.product.price }} ฿</span></td>
                                <td>{{  cart.quantity }}</td>
                                <th><div class="badge badge-outline badge-ghost">{{ cart.total_price }}฿</div></th>
                            </tr>   
                        </tbody>
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
                                    <div class="badge badge-soft badge-success text-white">{{ calculateTotalPrice() }} ฿</div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Place Order Button -->
                <div class="mt-auto pt-5">
                    <button @click="createOrder" class="btn bg-blue-700 hover:bg-blue-900 text-white rounded-badge w-full">
                        Place Order
                    </button>                
                </div>
            </div>
            <!-- Checkout Right Section -->
            <div class="space-y-5">
                <div class="relative card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                    <div class="flex flex-col gap-3">
                        <h1 class="card-title font-bold text-lg text-primary flex items-center">
                            Address Information
                        </h1>
                        <div v-if="hasAddress">
                            <div class="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <legend class="text-sm/6 font-semibold text-gray-900">Peter Parker</legend>
                                <div class="mt-1 text-sm/6 text-gray-600">
                                    <p>098-765-4321</p>
                                    <p>THAILAND</p>
                                    <p>Bangkok, Jatuchak, Sena Nikhom</p>
                                    <p>123, PS, Main St., 10001</p>
                                    <p class="text-gray-600">Apartment 5B, Near Central Park</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex space-x-2 pt-4">
                        <NuxtLink to="/customer/address/checkout">
                            <button class="btn btn-outline btn-info">Select Address</button> 
                        </NuxtLink>
                    </div>
                </div>

                <!-- Payment Method Section -->
                <div class="card card-compact bg-base-100 shadow-xl p-6 rounded-xl">
                    <h1 class="card-title font-bold text-lg text-primary flex items-center">
                        Payment Method
                    </h1>

                    <div>
                        <fieldset>
                            <div class="mt-6 space-y-6">
                                <img src="/public/img/prompt_pay-book.jpg" alt="qr code not found" 
                                class="w-40 h-40">

                                <!-- <div class="flex items-center gap-x-3">
                                    <input id="push-everything" name="push-notifications" type="radio" checked class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white" />
                                    <label for="push-everything" class="block text-sm/6 font-medium text-gray-900">QR Code</label>
                                </div>
                                <div class="flex items-center gap-x-3">
                                    <input id="push-email" name="push-notifications" type="radio" class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white" />
                                    <label for="push-email" class="block text-sm/6 font-medium text-gray-900">Transfer via Bank Account</label>
                                </div> -->
                            </div>
                        </fieldset>
                    </div>
                     <!-- QR Code Image Upload -->
                     <h1 class="card-title font-bold text-lg text-primary flex items-center mt-4">
                        Upload E-Slip
                    </h1>

                    <div class="mt-6">
                        <input type="file" class="file-input file-input-info" @change="handleFileChange" accept="image/*"/>
                        <!-- <input type="file" @change="handleFileChange" accept="image/*" 
                        class="file-input bg-blue-200 font-bold" /> -->
                    </div>
                </div>

               
            </div>
        </div>
    </div>
</template>
