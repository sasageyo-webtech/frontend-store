<script setup>
const { $swal } = useNuxtApp()
const userStore = useUser()
const addresses = ref([])
const user = ref({})

const deleteAddress = async (customer_address_id) => {
    $swal.fire({
        title: "Do you want to delete the address?",
        showCancelButton: true,
        confirmButtonText: "Delete",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await apiClient.delete(`/address-customers/${customer_address_id}`);
                if (response.status === 200) {
                    addresses.value = addresses.value.filter(addr => addr.customer_address_id !== customer_address_id);
                }
                $swal.fire("Deleted!", "", "success");

                // โหลดข้อมูลใหม่หลังลบเสร็จ
                await fetchAddress();
            } catch (error) {
                if (error.response) {
                    $swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: error.response.message,
                    });
                }
            }
        }
    });
};

const fetchAddress = async () => {
    try {
        const addressesResponse = await apiClient.get(`/address-customers?customer_id=${user.value.customer_id}`);
        addresses.value = addressesResponse.data.data
    }catch(error){
        if(error.response){
            console.log(error.response.message)
        }
    }
}


const loadUser = async () => {
    await userStore.loadUser()
    user.value = userStore.userInfo
}

onMounted( async ()=>{
    await loadUser()
    await fetchAddress()
})



</script>

<template>
    <div>
        <NuxtLink to="/customer/checkout" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>
        <div class="grid gap-4 p-4 mx-20">
            <div class="flex items-center">
                <h1 class="card-title font-bold text-lg text-primary">Address List</h1>
                <div class="ml-auto">
                    <NuxtLink to="/customer/address/checkout/create">
                        <button class="btn btn-outline btn-info">Add new address</button>
                    </NuxtLink>
                </div>
            </div>

            <div class="bg-base-100 rounded-xl shadow-md p-4">
                <!-- แสดงข้อความเมื่อไม่มีที่อยู่ -->
                <div v-if="addresses.length === 0" class="text-center py-4 text-gray-500">
                    No address found. Please add a new address.
                </div>

                <ul v-else class="space-y-2">
                    <li v-for="(address, index) in addresses" :key="index" class="flex items-center justify-between py-3 border-t">
                        <div>
                            <div class="font-medium">{{ address.name }}</div>
                            <div class="text-xs opacity-60">{{ address.phone_number }}</div>

                            <div class="text-xs text-gray-500">📍 {{ address.house_number}}, {{ address.building }}</div>
                            <div class="text-xs text-gray-500">{{ address.street}}, {{ address.sub_district }}, {{ address.district }}</div>
                            <div class="text-xs text-gray-500">{{ address.province }}, {{ address.country }}</div>
                            <div class="text-xs text-gray-500">{{ address.detail_address }}</div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <NuxtLink :to="`/customer/checkout?customer_address_id=${address.customer_address_id}`">
                                <button class="btn btn-sm btn-primary">Select</button>
                            </NuxtLink>
                            <button @click="deleteAddress(address.customer_address_id)" class="btn btn-sm btn-error">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

  

