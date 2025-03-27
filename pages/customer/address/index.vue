<template>
    <div>

        <div class="grid gap-4 p-4 mx-20">
            <div class="flex items-center">
                <h1 class="card-title font-bold text-lg text-primary">Address List</h1>
                <div class="ml-auto">
                    <NuxtLink to="/customer/address/create">
                        <button class="btn btn-outline btn-info">Add new address</button>
                    </NuxtLink>
                </div>
            </div>
  
            <div>
                <ul class="bg-base-100 rounded-xl shadow-md p-4 space-y-2">
                    <li class="text-xs opacity-60 tracking-wide">Select your address</li>
                    
                    <li v-for="(address, index) in addresses" :key="index" class="flex items-center justify-between py-3 border-t">
                        <div>
                            <div class="font-medium">{{ address.name }}</div>
                            <div class="text-xs opacity-60">{{ address.details }}</div>
                            <div class="text-xs text-gray-500">📍 {{ address.note }}</div>
                            <div class="text-xs text-gray-500">📞 {{ address.phone }}</div>
                        </div>
                        <div class="flex items-center space-x-2">
  
  
                            <NuxtLink :to="`/customer/address/edit/`">
                                <button class="btn btn-sm btn-warning">Edit</button>
                            </NuxtLink>
  
                            <button @click="deleteAddress(index)" class="btn btn-sm btn-error">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            selectedIndex: null,
            addresses: [
                { name: "Jane Doe", details: "456, no1, Second St, Sub District, District, Province, Country, 54321", note: "Next to the school", phone: "0987654321" },
                { name: "John Smith", details: "789, Tower B, Third Ave, Small Town, Big City, Province, Country, 65432", note: "Near the park", phone: "0912345678" },
                { name: "Alice Wonderland", details: "123, Apt 5A, Wonderland St, Magic Town, Fantasy, Province, Country, 12345", note: "Beside the river", phone: "0876543210" }
            ]
        };
    },
    methods: {
        deleteAddress(index) {
            this.addresses.splice(index, 1);
            if (this.selectedIndex === index) {
                this.selectedIndex = null;
            }
        }
    }
  };
  </script>
  