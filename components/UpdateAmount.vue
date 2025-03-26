<template>
    <div class="p-4">
      <input 
        type="number" 
        class="input validator" 
        required 
        placeholder="1" 
        min="1" 
        max="100" 
        v-model="inputValue"
        @input="checkUpdate"
      />
  
      <button 
        v-if="isUpdated" 
        class="btn btn-primary btn-xs text-m ml-10"
        @click="updateValue"
      >
        Update
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const originalValue = ref(1) // ค่าตั้งต้น
  const inputValue = ref(originalValue.value)
  const isUpdated = ref(false)
  
  const checkUpdate = () => {
    isUpdated.value = inputValue.value !== originalValue.value
  }
  
  const updateValue = () => {
    originalValue.value = inputValue.value
    isUpdated.value = false
  }
  </script>
  