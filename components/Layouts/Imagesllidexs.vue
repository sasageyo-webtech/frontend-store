<template>
    <div>
        <div class="carousel rounded-box w-64">
            <div v-for="(image, index) in images" :key="index" class="carousel-item w-full">
                <img :src="image" class="w-full" alt="Image Slide" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    images: {
        type: Array,
        required: true
    }
})
</script>
