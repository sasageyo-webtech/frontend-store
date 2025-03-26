<script setup>

    const router = useRouter()
    const username = ref('test5')
    const email = ref('test5@gmail.com')
    const firstname = ref('d')
    const lastname = ref('d')
    const gender = ref('d')
    const password = ref('d')
    const confirm_password = ref('d')

    const errorMessage = ref('')
    const loading = ref(false)

    const registerUser = async () => {

        checkInputError()

        try {
            loading.value = true
            const {error ,response} = await useAPIFetch("/users/register", {
                method: 'post',
                accept: 'application/json',
                
                body: {
                    username,
                    email,
                    firstname,
                    lastname,
                    gender,
                    password,
                    confirm_password
                }
            });

                if(error.value.statusCode === 400){
                errorMessage.value = error.value.data.message
            }

            // localStorage.setItem('authToken', response.data.token)
            // localStorage.setItem('user', JSON.stringify(response.data.user))
            // router.push('/auth/login')
        } catch (error) {
            if (error.response) {
                errorMessage.value = error.response.data.message || 'Registration failed.'
            } else if (error.request) {
                errorMessage.value = 'Network error. Please try again later.'
            } else {
                errorMessage.value = error.message
            }
        } finally {
            loading.value = false
        }
    }

    definePageMeta({
    layout: 'empty',
    })

    function checkInputError() {
        let errorMessages = []
        if (!username.value) errorMessages.push('username')
        if (!email.value) errorMessages.push('email')
        if (!firstname.value) errorMessage.push('firstname')
        if (!lastname.value) errorMessage.push('lastname')
        if (!gender.value) errorMessage.push('gender')
        if (!password.value) errorMessages.push('password')
        if (!confirm_password.value) errorMessages.push('confirm password')
        
        if (errorMessages.length > 0) {
            errorMessage.value = 'Please enter your ' + errorMessages.join(' and ') + '.'
            return
        }
    }

</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-200">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            <h2 class="text-2xl font-semibold text-center text-gray-700">Register</h2>
            
            <form @submit.prevent="registerUser" class="mt-4">
                <div class="mt-3">
                    <label class="block text-gray-700">Username</label>
                    <input v-model="username" type="text" placeholder="Enter your username"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>

                <div class="mt-3">
                    <label class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>


                <div class="mt-3">
                    <label class="block text-gray-700">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>

                <div class="mt-3">
                    <label class="block text-gray-700">Confirm Password</label>
                    <input v-model="confirm_password" type="password" placeholder="Enter your confirm password"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>

                <div class="flex items-center mt-3 justify-center">
                    <p>Already have an Account?</p>
                    <NuxtLink to="/auth/login">
                        <button type="button" class="pl-2 text-blue-700 font-bold">
                            Log In
                        </button>
                    </NuxtLink>
                </div>

                <button type="submit" :disabled="loading" 
                    class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {{ loading ? 'Registering...' : 'Register' }}
                </button>

                <div class="flex justify-center">
                    <textarea v-if="errorMessage" class="mt-2 text-red-500 text-sm w-full hfull"> {{ errorMessage }}</textarea>
                </div>
            </form>
        </div>
    </div>
</template>
