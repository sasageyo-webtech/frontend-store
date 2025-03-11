<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { login } from '@api/auth'

    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const loading = ref(false)

    const loginUser = async () => {
    errorMessage.value = ''
    if (!email.value || !password.value) {
        errorMessage.value = 'Please enter both email and password.'
        return
    }

    try {
        loading.value = true
        const response = await login(email.value, password.value)
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        router.push('/products')
    } catch (error) {
        errorMessage.value = error.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-200">
        <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
            <h2 class="text-2xl font-semibold text-center text-gray-700">Login</h2>
            
            <form @submit.prevent="loginUser" class="mt-4">
                <div>
                    <label class="block text-gray-700">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>

                <div class="mt-3">
                    <label class="block text-gray-700">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password"
                        class="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300">
                </div>

                <div class="flex items-center mt-3 justify-center">
                    <p>Don't have an account?</p>
                    <NuxtLink to="/register">
                        <button type="button" class="pl-2 text-blue-700 font-bold">
                            Sign Up
                        </button>
                    </NuxtLink>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>

                <div class="flex justify-center">
                    <p v-if="errorMessage" class="mt-2 text-red-500 text-sm">{{ errorMessage }}</p>
                </div>
            </form>
        </div>
    </div>
</template>
