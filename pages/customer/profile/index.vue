<template>
  <div class="flex justify-center items-center min-h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl p-6">
      <div class="card-body items-center text-center space-y-4">
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :src="generateAvatarUrl(userStore.userInfo.firstname, userStore.userInfo.lastname)" alt="Profile" />
          </div>
        </div>

        <h2 class="card-title text-lg font-bold">{{ userStore.userInfo.username }}</h2>
        <p class="text-gray-700 font-medium">{{ userStore.userInfo.firstname }} {{ userStore.userInfo.lastname }}</p>

        <div class="text-gray-500 space-y-1">
          <p>{{ userStore.userInfo.email }}</p>
          <p>{{ userStore.userInfo.gender === 'MALE' ? 'Male' : 'Female' }}</p>
          <p class="text-sm">📅 Birthdate: {{ formatDate(userStore.userInfo.birthdate) }}</p>
          <p class="text-sm">📞 {{ userStore.userInfo.phone_number }}</p>
          <p class="text-sm">🆔 {{ userStore.userInfo.citizen_code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUser();
userStore.loadUser();

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateAvatarUrl = (firstname, lastname) => {
  const name = `${firstname} ${lastname}`.trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
};
</script>
