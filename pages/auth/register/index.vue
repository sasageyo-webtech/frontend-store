<script setup>
definePageMeta({layout: 'auth'})

const router = useRouter();
const { $swal } = useNuxtApp()
const form = ref({  
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
    password: '',
    confirm_password: '',
});
const errors = ref({});


const register = async () => {
      errors.value = {}; // เคลียร์ error ก่อนส่งคำขอ

      try {
        const response = await apiClient.post('/users/register', form.value);
        $swal.fire({
            title: "Good job!",
            text: "You Registered Successfully!",
            icon: "success"
        });
        router.push('/auth/login')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          errors.value = error.response.data.errors;
        } else {
          console.log(error.message)
        }
      }
    }
</script>

<template>
  <div class="max-w-2xl mx-auto p-5 border rounded-lg shadow-lg my-8">
    <h2 class="text-2xl font-semibold mb-4">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block font-medium">Username</label>
        <input v-model="form.username" type="text" class="w-full p-2 border rounded" />
        <p v-if="errors.username" class="text-red-500 text-sm">{{ errors.username[0] }}</p>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</p>
      </div>
      <div class="flex gap-4">
        <div class="mb-4 w-1/2">
            <label class="block font-medium">Firstname</label>
            <input v-model="form.firstname" type="text" class="w-full p-2 border rounded" />
            <p v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname[0] }}</p>
        </div>
        <div class="mb-4 w-1/2">
            <label class="block font-medium">Lastname</label>
            <input v-model="form.lastname" type="text" class="w-full p-2 border rounded" />
            <p v-if="errors.lastname" class="text-red-500 text-sm">{{ errors.lastname[0] }}</p>
        </div>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Gender</label>
        <select v-model="form.gender" class="w-full p-2 border rounded">
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <p v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender[0] }}</p>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" />
        <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password   [0] }}</p>
      </div>
      <div class="mb-4">
        <label class="block font-medium">Confirm Password</label>
        <input v-model="form.password_confirmation" type="password" class="w-full p-2 border rounded" />
      </div>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">Register</button>
    </form>
  </div>
</template>