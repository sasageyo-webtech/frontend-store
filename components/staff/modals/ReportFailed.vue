<script setup>
    defineProps({
        show: Boolean,
        title: {
            type: String,
            default: "Title",
        },
        subtitle: {
            type: String,
            default: ""
        },
        buttonText: {
            type: String,
            default: "OK",
        }
    });

    const emit = defineEmits('close');

    const closeModal = () => {
        emit('close');
        // location.reload();
    };
</script>

<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 class="text-xl text-red-600 font-bold mb-4">{{ title }}</h2>
            <p class="text-red-600">{{ subtitle }}</p>
            <button 
                @click="closeModal" 
                class="mt-4 px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-700">
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>
