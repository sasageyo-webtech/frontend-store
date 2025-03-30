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



const createAddress = async () => {
    errorMessage.value = ''
    if (!name.value || !phone_number.value || !house_number.value || !building.value || !street.value 
        || !sub_district.value || !district.value || !province.value || !country.value || !postal_code.value || !detail_address.value )
        {
        errorMessage.value = 'Please enter both email and password.'
        return
    }
    try {
        loading.value = true
        const user = userStore.userInfo
        console.log(5)
        
        const response = await apiClient.post('/address-customers   ', {
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
        console.log(response.data)
        
        router.push('/customer/address/checkout')

    } catch (error) {
        errorMessage.value = error.message
    } finally {
        loading.value = false
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
        <div class="grid gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg mx-20">
                <h1 class="card-title font-bold text-lg text-primary">
                        Address List
                </h1>   
                <form @submit.prevent="createAddress" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Name</label>
                        <input v-model="name" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Phone Number</label>
                        <input v-model="phone_number" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">House Number</label>
                        <input v-model="house_number" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Building</label>
                        <input v-model="building" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Street</label>
                        <input v-model="street" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Sub District</label>
                        <input v-model="sub_district" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">District</label>
                        <input v-model="district" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Province</label>
                        <input v-model="province" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Country</label>
                        <input v-model="country" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Postal Code</label>
                        <input v-model="postal_code" 
                        class="input input-bordered w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Detail Address</label>
                        <input v-model="detail_address" 
                        class="input input-bordered w-full">
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-full">Save</button> 
          
                    
                </form>
</div>


    </div>
</template>