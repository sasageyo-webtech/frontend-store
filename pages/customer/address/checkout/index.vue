<script setup>
const userStore = useUser()
const addresses = ref([])

const deleteAddress = async (customer_id) => {
    console.log(customer_id)
    const response = await apiClient.delete(`/address-customer/${customer_id}`)
    console.log(response.status)
}

const fetchAddress = async () => {
    const addressesResponse = await apiClient.get(`/address-customers?customer_id=${userStore.userInfo.customer_id}`);
    addresses.value = addressesResponse.data.data
    console.log(addresses.value)
}

onMounted( async ()=>{
    await userStore.loadUser();
    fetchAddress()
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

            <div>
                <ul class="bg-base-100 rounded-xl shadow-md p-4 space-y-2">
                    <li class="text-xs opacity-60 tracking-wide">Select your address</li>

                    <li v-for="(address, index) in addresses" :key="index" class="flex items-center justify-between py-3 border-t">
                        <div>
                            <div class="font-medium">{{ address.name }}</div>
                            <div class="text-xs opacity-60">{{ address.phone_number }}</div>

                            <div class="text-xs text-gray-500">📍 {{ address.house_number}}, {{ address.building }}</div>
                            <div class="text-xs text-gray-500"> {{ address.street}}, {{ address.sub_district }}, {{ address.district}}</div>
                            <div class="text-xs text-gray-500"> {{ address.province }}, {{ address.country }}, {{ address.district }}</div>
                            <div class="text-xs text-gray-500">{{ address.detail_address}}</div>
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

