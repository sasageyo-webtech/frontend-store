<template>
    <section class="h-[80vh] flex items-center justify-center px-4">
        <form @submit.prevent="registerHandler" class="max-w-lg w-full">
            <h1 class="mb-3 text-3xl font-bold">Create new account!</h1>
            <Processing v-if="processing" :text="processing" />
            <Failed v-if="failed" :text="failed" />
            <div class="w-full mb-3">
                <Input type="text" v-model.trim="username" placeholder="username" required />
                <Error v-if="errors.username" :text="errors.username" />
            </div>
            <div class="w-full mb-3">
                <Input type="email" v-model="email" placeholder="Email Address" required />
                <Error v-if="errors.email" :text="errors.email" />
            </div>
            <div class="w-full mb-3">
                <Input type="text" v-model="firstname" placeholder="firstname" required />
                <Error v-if="errors.firstname" :text="errors.firstname" />
            </div>
            <div class="w-full mb-3">
                <Input type="text" v-model="lastname" placeholder="lastname" required />
                <Error v-if="errors.lastname" :text="errors.lastname" />
            </div>
            <div class="w-full mb-3">
                <Input type="text" v-model="gender" placeholder="gender" required />
                <Error v-if="errors.gender" :text="errors.gender" />
            </div>
            <div class="w-full mb-3">
                <Input type="password" v-model="password" placeholder="Password" required />
                <Error v-if="errors.password" :text="errors.password" />
            </div>
            <div class="w-full mb-3">
                <Input type="password" v-model="confirm_password" placeholder="confirm password" required />
                <Error v-if="errors.confirm_password" :text="errors.confirm_password" />
            </div>
            <!-- <Button text="Register" /> -->
            <Button type="submit"  class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</Button>
        </form>
    </section>
</template>

<script setup>
    const username = ref("");
    const email = ref("");
    const firstname = ref("");
    const lastname = ref("");
    const gender = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const errors = ref({
        username: null,
        email: null,
        firstname: null,
        lastname: null,
        gender: null,
        password: null,
        confirm_password: null,
        count: 0
    });
    const processing = ref("");
    const failed = ref("");
    const router = useRouter();
    

    const registerHandler = async () => {
        processing.value = "Creating account...";
        failed.value = "";
        errors.value = {
            username: null,
            email: null,
            firstname: null,
            lastname: null,
            gender: null,
            password: null,
            confirm_password: null,
            count: 0
        }
        if(!username.value){
            errors.value.username = "Username is required!";
            errors.value.count += 1;
        }
        if(!email.value){
            errors.value.email = "Email is required!";
            errors.value.count += 1;
        }
        if(!firstname.value){
            errors.value.firstname = "Firstname is required!";
            errors.value.count += 1;
        }
        if(!lastname.value){
            errors.value.lastname = "Lastname is required!";
            errors.value.count += 1;
        }
        if(!gender.value){
            errors.value.gender = "Gender is required!";
            errors.value.count += 1;
        }
        if(!password.value){
            errors.value.password = "Password is required!";
            errors.value.count += 1;
        }
        if (!confirm_password.value) {
            errors.value.confirm_password = "Confirm Password is required!";
            errors.value.count += 1;
        } else if (confirm_password.value !== password.value) {
            errors.value.confirm_password = "Password and Confirm Password do not match!";
            errors.value.count += 1;
        }

        if(errors.value.count == 0){
            try{
                const response = await $fetch(`http://localhost/api/users/register`, {
                    method: "POST",
                    body: {
                        username: username.value,
                        email: email.value,
                        firstname: firstname.value,
                        lastname: lastname.value,
                        gender: gender.value,
                        password: password.value,
                        confirm_password: confirm_password.value
                    }
                });

                const data = await response.json()

                if(data){
                    // cookie.value = data.token;
                    console.log(data)
                    router.push('/auth/login');
                }
            }catch(e){
                failed.value = "Something went wrong!";
            }
        }
        processing.value = "";
    }
</script>