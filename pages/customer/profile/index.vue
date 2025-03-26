<template>
    <div class="flex justify-center items-center min-h-screen bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://ui-avatars.com/api/?name=Patdarin+Kaewwichien" alt="Profile" />
            </div>
          </div>
          <h2 class="card-title">{{ profile.firstname }} {{ profile.lastname }}</h2>
          <p class="text-gray-500">{{ profile.gender === 'MALE' ? 'ชาย' : 'หญิง' }}</p>
          <p class="text-sm">📅 วันเกิด: {{ formatDate(profile.birthdate) }}</p>
          <p class="text-sm">📞 {{ profile.phone_number }}</p>
          <div class="card-actions">
            <button class="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const profile = {
    firstname: "Athirat",
    lastname: "Kaewwichien",
    gender: "MALE",
    citizen_code: "1234567890123",
    birthdate: "2003-01-29",
    phone_number: "1234567890",
  };
  
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("th-TH", options);
  };
  </script>
  