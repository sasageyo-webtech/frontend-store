<script setup>
import { UserRole } from '~/types/users'
import { useUser } from '~/stores/useUser'

const router = useRouter()
const userStore = useUser()
const name = ref('')
const phone_number = ref('')
const house_number = ref('')
const building = ref('')
const street = ref('')
const sub_district = ref('')
const district = ref('')
const province = ref('')
const country = ref('')
const postal_code = ref('')
const detail_address = ref('')
const errorMessage = ref('')
const loading = ref(false)
const errors = ref({})


const createAddress = async () => {
    errors.value = {}
    
    try {
        const user = userStore.userInfo
        
        await apiClient.post('/address-customers   ', {
            customer_id: user.customer_id,
            name: name.value,
            phone_number: phone_number.value,
            house_number: house_number.value,
            building: building.value,
            street: street.value,
            sub_district: sub_district.value,
            district: district.value,
            province: province.value,
            country: country.value,
            postal_code: postal_code.value,
            detail_address: detail_address.value
        });      

        router.push('/customer/address/checkout')
    } catch (error) {
        if(error.response){
            console.log(error.response.data.errors)
            errors.value = error.response.data.errors
        }
    }
}

onMounted(async () => {
    await userStore.loadUser()
})
</script>

<template>
    <div>
        <NuxtLink to="/customer/address/checkout" class="flex mx-20 mt-5">
            <svgLess></svgLess>
            <span>Back</span>
        </NuxtLink>
        <br>
        <div class="grid gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg mx-20 my-6">
                <h1 class="card-title font-bold text-lg text-primary">
                        Address List
                </h1>   
                <form @submit.prevent="createAddress" class="space-y-5">
                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <label class="block text-sm font-medium">Reciever Name</label>
                            <input v-model="name" 
                            class="input input-bordered w-full">
                            <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm font-medium">Reciever Phone Number</label>
                            <input v-model="phone_number" 
                            class="input input-bordered w-full">
                            <p v-if="errors.phone_number" class="text-red-500 text-sm">{{ errors.phone_number[0] }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="w-1/5">
                            <label class="block text-sm font-medium">House Number</label>
                            <input v-model="house_number" 
                            class="input input-bordered w-full">
                            <p v-if="errors.house_number" class="text-red-500 text-sm">{{ errors.house_number[0] }}</p>
                        </div>
                        <div class="w-2/5">
                            <label class="block text-sm font-medium">Building</label>
                            <input v-model="building" 
                            class="input input-bordered w-full">
                            <p v-if="errors.building" class="text-red-500 text-sm">{{ errors.building[0] }}</p>
                        </div>
                        <div class="w-2/5">
                            <label class="block text-sm font-medium">Street</label>
                            <input v-model="street" 
                            class="input input-bordered w-full">
                            <p v-if="errors.street" class="text-red-500 text-sm">{{ errors.street[0] }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <label class="block text-sm font-medium">Sub District</label>
                            <input v-model="sub_district" 
                            class="input input-bordered w-full">
                            <p v-if="errors.sub_district" class="text-red-500 text-sm">{{ errors.sub_district[0] }}</p>
                        </div>
                        <div class="w-1/2">
                            <label class="block text-sm font-medium">District</label>
                            <input v-model="district" 
                            class="input input-bordered w-full">
                            <p v-if="errors.district" class="text-red-500 text-sm">{{ errors.district[0] }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="w-2/5">
                            <label class="block text-sm font-medium">Province</label>
                            <input v-model="province" 
                            class="input input-bordered w-full">
                            <p v-if="errors.province" class="text-red-500 text-sm">{{ errors.province[0] }}</p>
                        </div>
                        <div class="w-2/5">
                            <label class="block text-sm font-medium">Country</label>
                            <input v-model="country" 
                            class="input input-bordered w-full">
                            <p v-if="errors.country" class="text-red-500 text-sm">{{ errors.country[0] }}</p>
                        </div>
                        <div class="w-1/5">
                            <label class="block text-sm font-medium">Postal Code</label>
                            <input v-model="postal_code" 
                            class="input input-bordered w-full">
                            <p v-if="errors.postal_code" class="text-red-500 text-sm">{{ errors.postal_code[0] }}</p>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Detail Address</label>
                        <input v-model="detail_address" 
                        class="input input-bordered w-full h-20">
                        <p v-if="errors.detail_address" class="text-red-500 text-sm">{{ errors.detail_address[0] }}</p>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-full">Save</button> 
                </form>
        </div>
    </div>
</template>