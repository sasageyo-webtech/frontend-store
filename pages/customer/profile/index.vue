<script setup>

const { $swal } = useNuxtApp()
const userStore = useUser();
const user = ref({});
const user_id = ref();
const editing = ref(false);
const editedUser = ref({});
const errors = ref({})


const formatDate = (dateStr) => {
  return dateStr ? new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "-";
};

const loadUser = async () => {
  try {
    const response = await apiClient.get(`/users/${user_id.value}`);
    user.value = response.data.data;
  } catch (error) {
    console.error("Failed to load user", error);
  }
};

const loadUserId = async () => {
  user_id.value = userStore.userInfo.user_id;
};

onMounted(async () => {
  await userStore.loadUser();
  await loadUserId();
  await loadUser();
  editedUser.value = { ...user.value };
});

const startEditing = () => {
  editing.value = true;
  editedUser.value = { ...user.value };
};

const cancelEditing = () => {
  editing.value = false;
};

const updateProfile = async () => {
    errors.value = {}
    $swal.fire({
        title: "Are you sure?",
        text: "Are you sure want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await apiClient.put(`/users/${user.value.user_id}/profile`, editedUser.value);
                user.value = response.data.data;
                $swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    timer: 2000,
                });
                editing.value = false;
            } catch (error) {
                if(error.response){
                    errors.value = error.response.data.errors
                }else console.error("Update failed", error);
            }
            
        }
    });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const formData = new FormData();
  formData.append("image_file", file);
  
  try {
    const response = await apiClient.post(`/users/${user.value.user_id}/profile/image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    user.value.image_path = response.data.data.image_path;
    $swal.fire("Success!", "Profile image updated.", "success");
  } catch (error) {
    console.error("Image upload failed", error);
  }
};

const removeImage = async () => {
  try {
    await apiClient.delete(`/users/${user.value.user_id}/profile/image`);
    user.value.image_path = "http://localhost/storage/users/default-user-profile.png";
    $swal.fire("Success!", "Profile image removed.", "success");
  } catch (error) {
    console.error("Failed to remove image", error);
  }
};

</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="card w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div class="flex items-center space-x-4">
          <div class="relative group">
            <div class="w-20 h-20 rounded-full border-4 border-primary overflow-hidden">
              <img :src="user.image_path" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition">
              <label class="cursor-pointer text-white text-sm">
                📷 Change
                <input type="file" @change="uploadImage" class="hidden" />
              </label>
              <button @click="removeImage" class="text-red-500 text-sm">❌ Remove</button>
            </div>
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ user.username }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </div>
        <button @click="startEditing" v-if="!editing" class="text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md">✏️ Edit</button>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-gray-700 font-medium">First Name</label>
            <input v-if="editing" v-model="editedUser.firstname" class="input input-bordered w-full" />
            <p v-else class="text-gray-900">{{ user.firstname || '-' }}</p>
            <p v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname[0] }}</p>
          </div>
          <div>
            <label class="text-gray-700 font-medium">Last Name</label>
            <input v-if="editing" v-model="editedUser.lastname" class="input input-bordered w-full" />
            <p v-else class="text-gray-900">{{ user.lastname || '-' }}</p>
          </div>
        </div>

        <div>
          <label class="text-gray-700 font-medium">Gender</label>
          <select v-if="editing" v-model="editedUser.gender" class="select select-bordered w-full">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <p v-else class="text-gray-900">{{ user.gender === 'MALE' ? 'Male' : user.gender === 'FEMALE' ? 'Female' : "Other" }}</p>
          <p v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender[0] }}</p>
        </div>

        <div>
          <label class="text-gray-700 font-medium">Birthdate</label>
          <input v-if="editing" type="date" v-model="editedUser.birthdate" class="input input-bordered w-full" />
          <p v-else class="text-gray-900">{{ formatDate(user.birthdate) }}</p>
          <p v-if="errors.birthdate" class="text-red-500 text-sm">{{ errors.birthdate[0] }}</p>
        </div>

        <div>
          <label class="text-gray-700 font-medium">Phone Number</label>
          <input v-if="editing" type="text" v-model="editedUser.phone_number" class="input input-bordered w-full" />
          <p v-else class="text-gray-900">{{ user.phone_number || '-' }}</p>
          <p v-if="errors.phone_number" class="text-red-500 text-sm">{{ errors.phone_number[0] }}</p>
        </div>

        <div>
          <label class="text-gray-700 font-medium">Citizen Code</label>
          <input v-if="editing" type="text" v-model="editedUser.citizen_code" class="input input-bordered w-full" />
          <p v-else class="text-gray-900">{{ user.citizen_code || '-' }}</p>
          <p v-if="errors.citizen_code" class="text-red-500 text-sm">{{ errors.citizen_code[0] }}</p>
        </div>
      </div>

      <div v-if="editing" class="flex justify-end space-x-2 mt-4">
        <button @click="updateProfile" class="btn btn-success">Update</button>
        <button @click="cancelEditing" class="btn btn-error">Cancel</button>
      </div>
    </div>
  </div>
</template>
