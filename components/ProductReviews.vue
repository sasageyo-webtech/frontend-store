<script setup>
import SvgStar from '@/components/svg/Star.vue'
import SvgGrayStar from '@/components/svg/GrayStar.vue'
import { computed } from 'vue'
import { format, parseISO } from 'date-fns'
import { th } from 'date-fns/locale'

const props = defineProps({
    username: String,
    comment: String,
    profile: String,
    rating: Number,
    time: String
});

const stars = computed(() => {
    return Array.from({ length: 5 }, (_, i) => i < props.rating ? 'full' : 'empty')
});


const formattedTime = computed(() => {
    return format(parseISO(props.time), "d MMM yyyy, HH:mm")
});
</script>



<template>
    <div class="grid grid-cols-[auto_1fr] gap-4 card card-compact bg-base-100 shadow-xl p-4 rounded-lg">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img alt="Profile Image" :src="profile" />
            </div>
        </div>

        <div>
            <div class="flex justify-between">
                <p class="text-xs">{{ username }}</p>
                <p class="text-gray-500 text-xs">{{ formattedTime }}</p>                
            </div>


            <div class="flex py-2">
                <div v-for="(star, index) in stars" :key="index">
                    <SvgStar v-if="star === 'full'" />
                    <SvgGrayStar v-else />
                </div>
            </div>
            <p>{{ comment }}</p>
        </div>
    </div>
</template>
