<script setup>
definePageMeta({layout: 'auth',})

const router = useRouter()
const { $swal } = useNuxtApp()
const userStore = useUser()
const form = ref({  
    email: '',
    password: '',
});

const errors = ref({});

const login = async () => {
    errors.value = {}

    try {        
        const response = await apiClient.post('/users/login', form.value);

        const user = response.data.data 
        $swal.fire({
            title: "Good job!",
            text: "You Login Successfully!",
            icon: "success"
        });
        //เก็บข้อมูล
        userStore.login(user)
        if(user.role == UserRole.CUSTOMER) router.push('/')
        else if(user.role == UserRole.STAFF) router.push('/staff/user')
        else {
            $swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Please try again later...",
            });
        }

    } catch (error) {
        if (error.response && error.response.status === 422) {
          errors.value = error.response.data.errors;
          console.log(errors.value)
        } else {
          console.log(error.message)
        }
    }
}
    
</script>

<template>
    <div class="h-[650px]flex">
        <div class="max-w-2xl min-w-md mx-auto p-5 border rounded-lg shadow-lg my-52">
            <h2 class="text-2xl font-semibold mb-4">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                <label class="block font-medium">Email</label>
                <input v-model="form.email" type="email" class="w-full p-2 border rounded" />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</p>
                </div>
                <div class="mb-4">
                <label class="block font-medium">Password</label>
                <input v-model="form.password" type="password" class="w-full p-2 border rounded" />
                <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password}}</p>
                </div>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-800 duration-300 text-xl">Login</button>
            </form>
            <div class="text-center mt-6">
                <p>
                    if you dont have any account   
                    <NuxtLink to="/auth/register">
                        <span class="text-blue-500 text-xl font-bold ml-2 underline hover:text-blue-800 duration-300">
                            Sign Up
                        </span>
                    </NuxtLink>
                </p>
            </div>
        </div>    
    </div>
  </template>