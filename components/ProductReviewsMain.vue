<script setup>
import SvgStar from '@/components/svg/Star.vue'
import SvgGrayStar from '@/components/svg/GrayStar.vue'
import { computed } from 'vue'

const props = defineProps({
    rating: Number
});

// ปัดค่าทศนิยมให้เป็นจำนวนเต็มก่อนนำไปสร้าง array
const stars = computed(() => {
    const roundedRating = Math.round(props.rating); // ปัดค่าขึ้นหรือลงตามหลักคณิตศาสตร์
    return Array.from({ length: 5 }, (_, i) => i < roundedRating ? 'full' : 'empty');
});
</script>

<template>
    <div class="flex">
        <div v-for="(star, index) in stars" :key="index">
            <SvgStar v-if="star === 'full'" />
            <SvgGrayStar v-else />
        </div>
    </div>
</template>
