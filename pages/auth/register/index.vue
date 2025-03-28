    <script setup>

    const router = useRouter();
    const form = ref({  
    username: 'testt',
    email: 'test@gmail.com',
    firstname: 'asd',
    lastname: 'asd',
    gender: 'MALE',
    password: '12345678',
    confirm_password: '12345678',
    });
    const errors = ref({});
    const successMessage = ref('');

    const formFields = {
    username: { label: 'Username', type: 'text', placeholder: 'Enter username' },
    email: { label: 'Email', type: 'email', placeholder: 'Enter email' },
    firstname: { label: 'First Name', type: 'text', placeholder: 'Enter first name' },
    lastname: { label: 'Last Name', type: 'text', placeholder: 'Enter last name' },
    gender: { label: 'Gender', type: 'text', placeholder: 'Enter gender' },
    password: { label: 'Password', type: 'password', placeholder: 'Enter password' },
    confirm_password: { label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' },
    };

    const register = async () => {
  errors.value = {};
  successMessage.value = '';

  try {
    const response = await apiClient.post('/users/register', {
      username: form.value.username,
      email: form.value.email,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      gender: form.value.gender,
      password: form.value.password,
      confirm_password: form.value.confirm_password,
    });

    if (response.status === 201) {
      successMessage.value = 'Registration successful! Redirecting...';
      setTimeout(() => router.push('./login'), 2000);
    } else {
      errors.value = response.data.message;
    }
  } catch (err) {
    if (err.response && err.response.data) {
      errors.value = err.response.data.message;
    } else {
      errors.value.general = 'An error occurred. Please try again later.';
    }
  }
};
    </script>

    <template>
        <div class="flex justify-center items-center min-h-screen bg-orange-100">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold text-center mb-4">Register</h2>
            <form @submit.prevent="register">
            <div v-for="(field, key) in formFields" :key="key" class="mb-4">
                <label class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
                <input
                v-model="form[key]"
                :type="field.type"
                :placeholder="field.placeholder"
                class="mt-1 p-2 w-full border rounded-md"
                />
                <p v-if="errors[key]" class="text-red-500 text-xs mt-1">{{ errors[key] }}</p>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
            </form>
            <p v-if="successMessage" class="text-green-500 text-center mt-4">{{ successMessage }}</p>
        </div>
        </div>
    </template>