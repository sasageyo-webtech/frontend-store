<template>
    <div class="flex justify-center items-center min-h-screen bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://ui-avatars.com/api/?name=pk" alt="Profile" />
            </div>
          </div>
          <h2 class="card-title">{{ userStore.userInfo.username }}</h2>
          <h2 class="card-title">{{ userStore.userInfo.firstname }} {{ userStore.userInfo.lastname }}</h2>
          <p class="text-gray-500">{{ userStore.userInfo.email }}</p>
          <p class="text-gray-500">{{ userStore.userInfo.gender === 'MALE' ? 'Male' : 'Girl' }}</p>
          <p class="text-sm">📅 Birthdate: {{ formatDate(userStore.userInfo.birthdate) }}</p>
          <p class="text-sm"> {{ userStore.userInfo.phone_number }}</p>
          <p class="text-sm"> {{ userStore.userInfo.citizen_code }}</p>
          <!-- <div class="card-actions">
            <button class="btn btn-primary">Edit Profile</button>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  const userStore = useUser()
  userStore.loadUser();

  
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-EN", options);
  };



  </script>
  